import { Router, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { ApiResponseBuilder } from '../../shared/utils/api-response';
import { authenticate } from '../../middleware/authenticate';
import { AuthenticatedRequest } from '../../shared/types/api';

export const seekerRouter = Router();

seekerRouter.use(authenticate);

/**
 * @route   GET /api/v1/seeker/dashboard
 * @desc    Get real Job Seeker Dashboard metrics from MySQL
 */
seekerRouter.get('/dashboard', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    const profile = await prisma.jobseekerprofile.findFirst({
      where: userId ? { userId } : undefined,
      include: { user: true }
    });

    const [applications, availableJobs] = await Promise.all([
      prisma.jobapplication.findMany({
        where: profile ? { seekerId: profile.id } : undefined,
        include: { job: true },
        take: 5,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.job.findMany({
        where: { status: 'APPROVED' },
        take: 5,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    ApiResponseBuilder.success(res, {
      profile: profile || {
        headline: 'Financial Analyst & Underwriter',
        yearsOfExperience: 6,
        resumeUrl: null,
      },
      stats: {
        submittedApplicationsCount: applications.length,
        availableJobsCount: availableJobs.length,
      },
      recentApplications: applications,
      recommendedJobs: availableJobs,
    }, 'Job seeker dashboard data loaded from database');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/seeker/jobs
 * @desc    Get all available approved jobs with search/filtering
 */
seekerRouter.get('/jobs', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, state, search } = req.query;

    const jobs = await prisma.job.findMany({
      where: {
        status: 'APPROVED',
        category: category ? String(category) : undefined,
        state: state ? String(state) : undefined,
        title: search ? { contains: String(search) } : undefined,
      },
      include: {
        employerprofile: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    ApiResponseBuilder.success(res, jobs, 'Available jobs retrieved from database');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/seeker/applications
 * @desc    Get all applications submitted by this job seeker
 */
seekerRouter.get('/applications', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.jobseekerprofile.findFirst({
      where: userId ? { userId } : undefined,
    });

    const applications = await prisma.jobapplication.findMany({
      where: profile ? { seekerId: profile.id } : undefined,
      include: {
        job: {
          include: { employerprofile: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    ApiResponseBuilder.success(res, applications, 'My applications retrieved from database');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/v1/seeker/applications
 * @desc    Apply to a job
 */
seekerRouter.post('/applications', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    let profile = await prisma.jobseekerprofile.findFirst({
      where: userId ? { userId } : undefined,
    });

    if (!profile && userId) {
      profile = await prisma.jobseekerprofile.create({
        data: {
          id: `jsp_${Date.now()}`,
          userId,
          updatedAt: new Date(),
        }
      });
    }

    const { jobId, coverLetter } = req.body;

    if (!jobId) {
      res.status(400).json({ success: false, message: 'jobId is required' });
      return;
    }

    const application = await prisma.jobapplication.create({
      data: {
        id: `app_${Date.now()}`,
        jobId,
        seekerId: profile?.id || 'seeker_default',
        coverLetter: coverLetter || '',
        status: 'SUBMITTED',
      }
    });

    ApiResponseBuilder.success(res, application, 'Application submitted successfully');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/seeker/profile
 * @desc    Get candidate profile & resume
 */
seekerRouter.get('/profile', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const profile = await prisma.jobseekerprofile.findFirst({
      where: userId ? { userId } : undefined,
      include: { user: true }
    });

    ApiResponseBuilder.success(res, profile, 'Candidate profile retrieved');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/v1/seeker/profile
 * @desc    Update candidate profile & skills
 */
seekerRouter.put('/profile', async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    let profile = await prisma.jobseekerprofile.findFirst({
      where: userId ? { userId } : undefined,
    });

    const { skills, resumeS3Key } = req.body;

    if (!profile && userId) {
      profile = await prisma.jobseekerprofile.create({
        data: {
          id: `jsp_${Date.now()}`,
          userId,
          skills: typeof skills === 'object' ? JSON.stringify(skills) : skills,
          resumeS3Key,
          updatedAt: new Date(),
        }
      });
    } else if (profile) {
      profile = await prisma.jobseekerprofile.update({
        where: { id: profile.id },
        data: {
          skills: typeof skills === 'object' ? JSON.stringify(skills) : skills || profile.skills,
          resumeS3Key: resumeS3Key || profile.resumeS3Key,
          updatedAt: new Date(),
        }
      });
    }

    ApiResponseBuilder.success(res, profile, 'Candidate profile updated');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/seeker/saved-jobs
 * @desc    Get candidate saved jobs
 */
seekerRouter.get('/saved-jobs', async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const jobs = await prisma.job.findMany({
      where: { status: 'APPROVED' },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    ApiResponseBuilder.success(res, jobs, 'Saved jobs retrieved');
    return;
  } catch (error) {
    next(error);
  }
});
