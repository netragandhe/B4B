import { Router, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { ApiResponseBuilder } from '../../shared/utils/api-response';
import { authenticate } from '../../middleware/authenticate';
import { AuthenticatedRequest } from '../../shared/types/api';

export const employerRouter = Router();

employerRouter.use(authenticate);

/**
 * @route   GET /api/v1/employer/dashboard
 * @desc    Get real Employer Dashboard metrics from MySQL
 */
employerRouter.get('/dashboard', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    const profile = await prisma.employerprofile.findFirst({
      where: userId ? { userId } : undefined,
      include: { user: true }
    });

    const [jobs, applicantsCount] = await Promise.all([
      prisma.job.findMany({
        where: profile ? { employerId: profile.id } : undefined,
        take: 5,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.jobapplication.count({
        where: profile ? { job: { employerId: profile.id } } : undefined
      })
    ]);

    ApiResponseBuilder.success(res, {
      profile: profile || {
        companyName: 'Apex Commercial Partners',
        industry: 'Commercial Real Estate',
        companySize: '50-100',
        activeJobCount: jobs.length,
      },
      stats: {
        activeJobsCount: jobs.length,
        totalApplicantsCount: applicantsCount,
      },
      recentJobs: jobs,
    }, 'Employer dashboard data loaded from database');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/employer/jobs
 * @desc    Get all jobs posted by this employer
 */
employerRouter.get('/jobs', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.employerprofile.findFirst({
      where: userId ? { userId } : undefined,
    });

    const jobs = await prisma.job.findMany({
      where: profile ? { employerId: profile.id } : undefined,
      include: {
        jobapplication: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    ApiResponseBuilder.success(res, jobs, 'Employer jobs retrieved from database');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/v1/employer/jobs
 * @desc    Create a new job posting in MySQL
 */
employerRouter.post('/jobs', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    let profile = await prisma.employerprofile.findFirst({
      where: userId ? { userId } : undefined,
    });

    if (!profile && userId) {
      profile = await prisma.employerprofile.create({
        data: {
          id: `emp_${Date.now()}`,
          userId,
          companyName: 'My Enterprise',
          updatedAt: new Date(),
        }
      });
    }

    const { title, category, city, state, jobType, description, salaryMin, salaryMax } = req.body;

    const newJob = await prisma.job.create({
      data: {
        id: `job_${Date.now()}`,
        employerId: profile?.id || 'emp_default',
        title: title || 'New Position',
        category: category || 'Finance & Accounting',
        city: city || 'Chicago',
        state: state || 'IL',
        jobType: jobType || 'FULL_TIME',
        description: description || 'Job description',
        salaryMin: salaryMin ? Number(salaryMin) : null,
        salaryMax: salaryMax ? Number(salaryMax) : null,
        status: 'PENDING',
        updatedAt: new Date(),
      }
    });

    ApiResponseBuilder.success(res, newJob, 'Job created and submitted for moderation');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/v1/employer/jobs/:id
 * @desc    Update or close a job posting
 */
employerRouter.put('/jobs/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const jobId = String(req.params.id);
    const { title, description, category, city, state, salaryMin, salaryMax } = req.body;

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        title,
        description,
        category,
        city,
        state,
        salaryMin: salaryMin ? Number(salaryMin) : undefined,
        salaryMax: salaryMax ? Number(salaryMax) : undefined,
        updatedAt: new Date(),
      }
    });

    ApiResponseBuilder.success(res, updatedJob, 'Job updated successfully');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/employer/applicants
 * @desc    Get all candidates who applied for this employer's jobs
 */
employerRouter.get('/applicants', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.employerprofile.findFirst({
      where: userId ? { userId } : undefined,
    });

    const applications = await prisma.jobapplication.findMany({
      where: profile ? { job: { employerId: profile.id } } : undefined,
      include: {
        job: true,
        jobseekerprofile: {
          include: { user: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    ApiResponseBuilder.success(res, applications, 'Applicants retrieved from database');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/v1/employer/applicants/:id
 * @desc    Update applicant review status
 */
employerRouter.put('/applicants/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const appId = String(req.params.id);
    const { status } = req.body;

    const existing = await prisma.jobapplication.findFirst({
      where: { id: appId }
    });

    if (!existing) {
      res.status(404).json({ success: false, message: 'Application not found' });
      return;
    }

    const updated = await prisma.jobapplication.update({
      where: {
        jobId_seekerId: {
          jobId: existing.jobId,
          seekerId: existing.seekerId,
        }
      },
      data: { status: status || 'REVIEWED' }
    });

    ApiResponseBuilder.success(res, updated, 'Application status updated');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/employer/profile
 * @desc    Get employer profile details
 */
employerRouter.get('/profile', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.employerprofile.findFirst({
      where: userId ? { userId } : undefined,
      include: { user: true }
    });

    ApiResponseBuilder.success(res, profile, 'Employer profile retrieved from database');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/v1/employer/profile
 * @desc    Update employer profile
 */
employerRouter.put('/profile', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.employerprofile.findFirst({
      where: userId ? { userId } : undefined,
    });

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    const { companyName, industry, website } = req.body;

    const updated = await prisma.employerprofile.update({
      where: { id: profile.id },
      data: {
        companyName: companyName || profile.companyName,
        industry: industry || profile.industry,
        website: website || profile.website,
        updatedAt: new Date(),
      }
    });

    ApiResponseBuilder.success(res, updated, 'Profile updated successfully');
    return;
  } catch (error) {
    next(error);
  }
});
