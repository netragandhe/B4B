import { evalPermission, evalScope, DEFAULT_PERMISSIONS } from './permissions'

export function runPermissionsTests() {
  const results: { name: string; passed: boolean; error?: string }[] = []

  function test(name: string, fn: () => void) {
    try {
      fn()
      results.push({ name, passed: true })
    } catch (err: any) {
      results.push({ name, passed: false, error: err.message })
    }
  }

  function assertEqual(actual: any, expected: any, msg?: string) {
    if (actual !== expected) {
      throw new Error(`Assertion failed: expected "${expected}", got "${actual}". ${msg || ''}`)
    }
  }

  // 1. Admin Tests
  test('Admin should have full access to everything with scope ALL', () => {
    assertEqual(evalPermission('Admin', 1, 'dashboard', 'view'), true)
    assertEqual(evalPermission('Admin', 1, 'rolesPermissions', 'edit'), true)
    assertEqual(evalScope('Admin', 1, 'leads'), 'all')
  })

  // 2. Biz Pro Rank 3 (Non-Leader) Tests
  test('Biz Pro Rank 3 should have OWN scope for leads, clients, and reports', () => {
    assertEqual(evalPermission('Biz Pro', 3, 'leads', 'view'), true)
    assertEqual(evalScope('Biz Pro', 3, 'leads'), 'own')
    assertEqual(evalScope('Biz Pro', 3, 'clients'), 'own')
    assertEqual(evalScope('Biz Pro', 3, 'reports'), 'own')
  })

  test('Biz Pro Rank 3 should NOT have access to bizproManagement or territory editing', () => {
    assertEqual(evalPermission('Biz Pro', 3, 'bizproManagement', 'view'), false)
    assertEqual(evalPermission('Biz Pro', 3, 'territory', 'edit'), false)
  })

  // 3. Biz Pro Rank 4 (Leader) Tests
  test('Biz Pro Rank 4 should elevate scope to TEAM for leads, clients, reports, and territory', () => {
    assertEqual(evalPermission('Biz Pro', 4, 'leads', 'view'), true)
    assertEqual(evalScope('Biz Pro', 4, 'leads'), 'team')
    assertEqual(evalScope('Biz Pro', 4, 'clients'), 'team')
    assertEqual(evalScope('Biz Pro', 4, 'reports'), 'team')
    assertEqual(evalScope('Biz Pro', 4, 'territory'), 'team')
  })

  test('Biz Pro Rank 4 should unlock bizproManagement and territory editing', () => {
    assertEqual(evalPermission('Biz Pro', 4, 'bizproManagement', 'view'), true)
    assertEqual(evalPermission('Biz Pro', 4, 'territory', 'edit'), true)
  })

  // 4. Employer & Job Seeker Tests
  test('Employer should have edit/delete access to jobs', () => {
    assertEqual(evalPermission('Employer', 1, 'jobs', 'create'), true)
    assertEqual(evalPermission('Employer', 1, 'jobs', 'delete'), true)
    assertEqual(evalScope('Employer', 1, 'jobs'), 'own')
  })

  test('Job Seeker should have apply/view access to jobs', () => {
    assertEqual(evalPermission('Job Seeker', 1, 'jobs', 'view'), true)
    assertEqual(evalPermission('Job Seeker', 1, 'jobs', 'create'), true)
    assertEqual(evalPermission('Job Seeker', 1, 'jobs', 'delete'), false)
  })

  const passed = results.filter((r) => r.passed).length
  const failed = results.filter((r) => !r.passed).length

  console.log(`\n========================================`)
  console.log(`Permissions Unit Test Suite Results:`)
  console.log(`Passed: ${passed} / ${results.length}`)
  if (failed > 0) {
    console.error(`Failed: ${failed}`)
    results.filter((r) => !r.passed).forEach((f) => console.error(` - ${f.name}: ${f.error}`))
  }
  console.log(`========================================\n`)

  return { passed, failed, total: results.length, results }
}

// Auto-run when executed via node / tsx
if (typeof globalThis !== 'undefined' && (globalThis as any).process?.argv?.[1]?.includes('permissions.test')) {
  runPermissionsTests()
}
