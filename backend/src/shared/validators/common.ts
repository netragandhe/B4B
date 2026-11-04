import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.string().optional().transform((val) => (val ? Math.max(Number(val), 1) : 1)),
  limit: z.string().optional().transform((val) => (val ? Math.min(Math.max(Number(val), 1), 100) : 20)),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const uuidParamSchema = z.object({
  id: z.string().uuid('Invalid UUID format'),
});

