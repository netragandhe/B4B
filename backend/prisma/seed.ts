import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// 18 Permission Modules from frontend permissions.ts
const MODULES = [
  'dashboard',
  'bizproManagement',
  'rankRules',
  'commissionMaker',
  'territory',
  'inventory',
  'billing',
  'leads',
  'clients',
  'scoreboard',
  'jobs',
  'affiliates',
  'cms',
  'training',
  'reports',
  'rolesPermissions',
  'ebox',
  'messages',
];

const ROLES = ['Admin', 'Biz Pro', 'Client', 'Affiliate', 'Employer', 'Job Seeker'];

// BizPro 9 Ranks
const RANKS = [
  { level: 1, title: 'Associate Advisor' },
  { level: 2, title: 'Senior Advisor' },
  { level: 3, title: 'Managing Advisor' },
  { level: 4, title: 'Regional Director' },
  { level: 5, title: 'Senior Regional Director' },
  { level: 6, title: 'Vice President' },
  { level: 7, title: 'Senior Vice President' },
  { level: 8, title: 'Executive Managing Director' },
  { level: 9, title: 'National Partner' },
];

async function main() {
  console.log('🌱 Starting Database Seeding...');

  // 1. Seed Roles & Permissions (6 roles x 18 modules = 108 records)
  for (const role of ROLES) {
    for (const mod of MODULES) {
      const isAdmin = role === 'Admin';
      const isBizPro = role === 'Biz Pro';
      const isClient = role === 'Client';
      const isAffiliate = role === 'Affiliate';
      const isEmployer = role === 'Employer';
      const isSeeker = role === 'Job Seeker';

      let canView = false;
      let canCreate = false;
      let canEdit = false;
      let canDelete = false;
      let canExport = false;
      let scope = 'OWN';

      if (isAdmin) {
        canView = true;
        canCreate = true;
        canEdit = true;
        canDelete = true;
        canExport = true;
        scope = 'ALL';
      } else if (isBizPro) {
        canView = ['dashboard', 'rankRules', 'commissionMaker', 'territory', 'inventory', 'billing', 'leads', 'clients', 'scoreboard', 'training', 'reports', 'ebox', 'messages'].includes(mod);
        canCreate = ['leads', 'clients', 'ebox', 'messages'].includes(mod);
        canEdit = ['leads', 'clients', 'ebox', 'messages'].includes(mod);
        canDelete = ['ebox', 'messages'].includes(mod);
        canExport = ['leads', 'clients', 'scoreboard', 'reports'].includes(mod);
        scope = ['inventory', 'scoreboard', 'training'].includes(mod) ? 'ALL' : 'OWN';
      } else if (isClient) {
        canView = ['dashboard', 'inventory', 'billing', 'ebox', 'messages'].includes(mod);
        canCreate = ['billing', 'ebox', 'messages'].includes(mod);
        canEdit = ['billing', 'ebox', 'messages'].includes(mod);
        canDelete = ['billing', 'ebox', 'messages'].includes(mod);
        scope = 'OWN';
      } else if (isAffiliate) {
        canView = ['dashboard', 'billing', 'leads', 'affiliates', 'reports', 'ebox'].includes(mod);
        canCreate = ['leads', 'affiliates', 'ebox'].includes(mod);
        canEdit = ['affiliates', 'ebox'].includes(mod);
        canDelete = ['ebox'].includes(mod);
        canExport = ['reports'].includes(mod);
        scope = 'OWN';
      } else if (isEmployer) {
        canView = ['dashboard', 'billing', 'jobs', 'reports', 'ebox', 'messages'].includes(mod);
        canCreate = ['jobs', 'billing', 'ebox', 'messages'].includes(mod);
        canEdit = ['jobs', 'billing', 'ebox', 'messages'].includes(mod);
        canDelete = ['jobs', 'billing', 'ebox', 'messages'].includes(mod);
        canExport = ['jobs', 'reports'].includes(mod);
        scope = 'OWN';
      } else if (isSeeker) {
        canView = ['dashboard', 'jobs', 'ebox', 'messages'].includes(mod);
        canCreate = ['jobs', 'ebox', 'messages'].includes(mod);
        canEdit = ['ebox', 'messages'].includes(mod);
        canDelete = ['ebox', 'messages'].includes(mod);
        scope = 'OWN';
      }

      await prisma.rolepermission.upsert({
        where: {
          roleId_menuId: {
            roleId: role,
            menuId: mod,
          },
        },
        update: {
          canView,
          canCreate,
          canEdit,
          canDelete,
          canExport,
          scope,
          updatedAt: new Date(),
        },
        create: {
          id: uuidv4(),
          roleId: role,
          menuId: mod,
          canView,
          canCreate,
          canEdit,
          canDelete,
          canExport,
          scope,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
  }

  // 2. Seed BizPro 9 Ranks
  for (const r of RANKS) {
    await prisma.rankrule.upsert({
      where: {
        level: r.level,
      },
      update: {
        title: r.title,
        updatedAt: new Date(),
      },
      create: {
        level: r.level,
        title: r.title,
        personalMonthlyVolumeMin: (r.level - 1) * 5000,
        personalMonthlyVolumeMax: r.level * 10000,
        consecutiveMonthsRequired: 3,
        requiredTeamMembers: Math.max(0, (r.level - 3) * 2),
        teamOverridePercent: r.level * 1.5,
        directCommissionPercent: 10 + r.level * 2,
        description: `Official rank requirements and criteria for ${r.title}`,
        termsOfPromotion: `Maintain monthly minimum active volume and pass leadership review for ${r.title}.`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // 3. Ensure Default PasswordHash for all demo users (Demo@1234)
  const defaultHash = await bcrypt.hash('Demo@1234', 10);
  await prisma.user.updateMany({
    where: {
      passwordHash: '',
    },
    data: {
      passwordHash: defaultHash,
    },
  });

  console.log('✅ Seeding completed successfully! 108 Role-Permissions and 9 BizPro Ranks created/verified.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
