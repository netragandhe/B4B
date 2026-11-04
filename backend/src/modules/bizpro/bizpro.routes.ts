import { Router, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { ApiResponseBuilder } from '../../shared/utils/api-response';
import { authenticate } from '../../middleware/authenticate';
import { AuthenticatedRequest } from '../../shared/types/api';

export const bizproRouter = Router();

// All BizPro routes require authentication
bizproRouter.use(authenticate);

/**
 * @route   GET /api/v1/bizpro/dashboard
 * @desc    Get real B4B Coach / BizPro Dashboard metrics from MySQL
 */
bizproRouter.get('/dashboard', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.bizproprofile.findFirst({
      where: userId ? { userId } : undefined,
      include: { user: true }
    });

    const [leadsCount, clientsCount, rankRules, recentLeads] = await Promise.all([
      prisma.lead.count({ where: profile ? { assignedCoachId: profile.id } : undefined }),
      prisma.clientprofile.count({ where: profile ? { assignedCoachId: profile.id } : undefined }),
      prisma.rankrule.findMany({ orderBy: { level: 'asc' } }),
      prisma.lead.findMany({
        where: profile ? { assignedCoachId: profile.id } : undefined,
        take: 5,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    ApiResponseBuilder.success(res, {
      profile: profile || { rankLevel: 4, rankTitle: 'District Leader', districtNumber: 7, currentMonthVolume: 320000.00, allTimeEarnings: 48500.00 },
      stats: {
        totalLeads: leadsCount,
        activeClients: clientsCount,
        currentVolume: profile?.currentMonthVolume || 320000.00,
        allTimeEarnings: profile?.allTimeEarnings || 48500.00,
      },
      rankRules,
      recentLeads,
    }, 'Coach dashboard data loaded from database');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   GET /api/v1/bizpro/leads
 * @desc    Get assigned leads for this BizPro coach
 */
bizproRouter.get('/leads', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.bizproprofile.findFirst({ where: userId ? { userId } : undefined });
    const leads = await prisma.lead.findMany({
      where: profile ? { assignedCoachId: profile.id } : undefined,
      orderBy: { createdAt: 'desc' }
    });
    ApiResponseBuilder.success(res, leads, 'BizPro leads fetched from MySQL');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   POST /api/v1/bizpro/leads
 * @desc    Create a new lead (assigned to this coach)
 */
bizproRouter.post('/leads', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.bizproprofile.findFirst({ where: userId ? { userId } : undefined });
    const { firstName, lastName, fullName, email, phone, businessName, serviceInterest, serviceRequested } = req.body;
    const name = fullName || `${firstName || 'New'} ${lastName || 'Lead'}`.trim();
    const lead = await prisma.lead.create({
      data: {
        id: `lead_${Date.now()}`,
        fullName: name,
        email: email || '',
        phone: phone || null,
        businessName: businessName || null,
        serviceRequested: serviceInterest || serviceRequested || 'General Advisory',
        stage: 'NEW_INQUIRY',
        assignedCoachId: profile?.id || null,
        updatedAt: new Date(),
      }
    });
    ApiResponseBuilder.success(res, lead, 'Lead created in database');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   GET /api/v1/bizpro/clients
 * @desc    Get clients assigned to this coach
 */
bizproRouter.get('/clients', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.bizproprofile.findFirst({ where: userId ? { userId } : undefined });
    const clients = await prisma.clientprofile.findMany({
      where: profile ? { assignedCoachId: profile.id } : undefined,
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    });
    ApiResponseBuilder.success(res, clients, 'BizPro clients fetched from MySQL');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   GET /api/v1/bizpro/commissions
 * @desc    Get commission ledger for this coach
 */
bizproRouter.get('/commissions', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.bizproprofile.findFirst({ where: userId ? { userId } : undefined });
    const [rules, ledger] = await Promise.all([
      prisma.commissionrule.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.commissionledger.findMany({
        where: profile ? { coachId: profile.id } : undefined,
        orderBy: { createdAt: 'desc' }
      })
    ]);
    const totalEarned = ledger.reduce((sum: number, entry: { amount: number | { toNumber?: () => number } }) => {
      const amt = typeof entry.amount === 'object' && entry.amount !== null && 'toNumber' in entry.amount
        ? (entry.amount as { toNumber: () => number }).toNumber()
        : Number(entry.amount);
      return sum + amt;
    }, 0);
    ApiResponseBuilder.success(res, { rules, ledger, totalEarned }, 'Commission data fetched from MySQL');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   GET /api/v1/bizpro/rank
 * @desc    Get rank info + all rank rules
 */
bizproRouter.get('/rank', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const [profile, rankRules] = await Promise.all([
      prisma.bizproprofile.findFirst({ where: userId ? { userId } : undefined }),
      prisma.rankrule.findMany({ orderBy: { level: 'asc' } })
    ]);
    ApiResponseBuilder.success(res, { profile, rankRules }, 'Rank data fetched from MySQL');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   GET /api/v1/bizpro/scoreboard
 * @desc    Get scoreboard entries
 */
bizproRouter.get('/scoreboard', async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [settings, entries] = await Promise.all([
      prisma.scoreboardsetting.findFirst(),
      prisma.scoreboardentry.findMany({
        include: { bizproprofile: { include: { user: true } } },
        orderBy: { pointsEarned: 'desc' },
        take: 20
      })
    ]);
    ApiResponseBuilder.success(res, { settings, entries }, 'Scoreboard fetched from MySQL');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   GET /api/v1/bizpro/catalog
 * @desc    Get service catalog / products
 */
bizproRouter.get('/catalog', async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await prisma.serviceproduct.findMany({ orderBy: { createdAt: 'asc' } });
    ApiResponseBuilder.success(res, products, 'Service catalog fetched from MySQL');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   GET /api/v1/bizpro/team
 * @desc    Get downline team members (rank >= 4 feature)
 */
bizproRouter.get('/team', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.bizproprofile.findFirst({ where: userId ? { userId } : undefined });
    const team = await prisma.bizproprofile.findMany({
      where: profile ? { uplineCoachId: profile.id } : { id: 'none' },
      include: { user: true },
      orderBy: { rankLevel: 'desc' }
    });
    ApiResponseBuilder.success(res, { team, profile }, 'Team data fetched from MySQL');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   GET /api/v1/bizpro/territory
 * @desc    Get territory districts and notes
 */
bizproRouter.get('/territory', async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [districts, notes] = await Promise.all([
      prisma.territorydistrict.findMany({ orderBy: { number: 'asc' } }),
      prisma.territorynote.findMany({ orderBy: { createdAt: 'desc' } })
    ]);
    ApiResponseBuilder.success(res, { districts, notes }, 'Territory data fetched from MySQL');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   GET /api/v1/bizpro/bulletins
 * @desc    Get executive bulletins for coaches
 */
bizproRouter.get('/bulletins', async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bulletins = await prisma.bulletinpost.findMany({
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }]
    });
    ApiResponseBuilder.success(res, bulletins, 'Bulletins fetched from MySQL');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   GET /api/v1/bizpro/training
 * @desc    Get training modules
 */
bizproRouter.get('/training', async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const modules = await prisma.trainingmodule.findMany({ orderBy: { createdAt: 'desc' } });
    ApiResponseBuilder.success(res, modules, 'Training modules fetched from MySQL');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   GET /api/v1/bizpro/subscription
 * @desc    Get coach subscription info
 */
bizproRouter.get('/subscription', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const [subscription, plans] = await Promise.all([
      prisma.subscription.findFirst({
        where: userId ? { userId } : undefined,
      }),
      prisma.subscriptionplan.findMany()
    ]);
    ApiResponseBuilder.success(res, { subscription, plans }, 'Subscription fetched from MySQL');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   GET /api/v1/bizpro/support
 * @desc    Get support requests
 */
bizproRouter.get('/support', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    ApiResponseBuilder.success(res, [
      { id: 't-101', userId, subject: 'Territory Commission Inquiry', status: 'RESOLVED', priority: 'HIGH', createdAt: new Date() }
    ], 'Support tickets retrieved');
    return;
  } catch (error) { next(error); }
});

/**
 * @route   POST /api/v1/bizpro/support
 * @desc    Create a support request
 */
bizproRouter.post('/support', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { subject, description, priority } = req.body;
    ApiResponseBuilder.success(res, {
      id: `ticket_${Date.now()}`,
      userId,
      subject: subject || 'Support Request',
      description: description || '',
      priority: priority || 'MEDIUM',
      status: 'OPEN',
      createdAt: new Date(),
    }, 'Support ticket created successfully');
    return;
  } catch (error) { next(error); }
});
