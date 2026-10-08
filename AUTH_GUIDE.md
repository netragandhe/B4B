# B4B Authentication System & Developer Integration Guide

This application features a fully decoupled, role-based authentication architecture for six user roles (**Admin, Biz Pro, Client, Affiliate, Employer, Job Seeker**).

---

## 🛠 Architecture Overview

```
src/
├── mock-data/users.ts        # Mock user accounts for all 6 roles
├── lib/auth/authService.ts   # Decoupled Auth API Service (THE SINGLE SWAP POINT)
├── context/AuthContext.tsx   # React Context, Session state, Idle Timeout & Storage Sync
├── components/auth/
│   ├── ProtectedRoute.tsx    # Redirects unauthenticated users to /portal/login?redirect=...
│   ├── PublicOnlyRoute.tsx   # Prevents authenticated users from viewing login/signup
│   ├── RoleGuard.tsx         # Validates user role & renders polished 403 Access Denied
│   ├── LogoutConfirmModal.tsx # Global session logout confirmation modal
│   └── IdleTimeoutModal.tsx   # 60s countdown warning modal after 14 mins idle
└── pages/auth/               # Login, Signup, Forgot/Reset Password, OTP screens
```

---

## ⚡ How to Replace `authService.ts` with a Real Backend API

`src/lib/auth/authService.ts` is designed as an isolated interface layer. To connect to a live backend (JWT REST API, GraphQL, Supabase, or Firebase):

### 1. HTTP Cookies / JWT Authorization Header
Modify the `login()` method inside `src/lib/auth/authService.ts`:

```ts
// Example REST Integration in src/lib/auth/authService.ts
async login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  
  if (!response.ok) {
    const errorData = await response.json()
    return { success: false, error: errorData.message }
  }

  const data = await response.json()
  
  // Store JWT token or let httpOnly cookie handle it
  localStorage.setItem('b4b_auth_token', data.token)
  localStorage.setItem('b4b_auth_user', JSON.stringify(data.user))

  return {
    success: true,
    user: data.user,
    token: data.token,
  }
}
```

No changes are required in `AuthContext.tsx`, `ProtectedRoute.tsx`, or any UI components when swapping to a real backend.

---

## ➕ How to Add a New User Role

To introduce a 7th user role (e.g. `Underwriter` or `Investor`):

1. **Update `UserRole` Type** in `src/mock-data/users.ts`:
   ```ts
   export type UserRole = 'Admin' | 'Biz Pro' | 'Client' | 'Affiliate' | 'Employer' | 'Job Seeker' | 'Investor'
   ```
2. **Add Mock User** to `MOCK_USERS` in `src/mock-data/users.ts`:
   ```ts
   'investor@demo.com': {
     id: 'usr_investor_01',
     name: 'Sophia Sterling',
     email: 'investor@demo.com',
     role: 'Investor',
     status: 'active',
     company: 'Sterling Global Fund',
   }
   ```
3. **Define Menu Structure** in `src/config/menus.ts`:
   ```ts
   MENU_CONFIG.Investor = [
     { id: 'dashboard', name: 'Portfolio Overview', href: '/portal/investor/dashboard', icon: LayoutDashboard },
     // ...
   ]
   ```
4. **Register Protected Route** in `App.tsx`:
   ```tsx
   <Route
     path="/portal/investor/*"
     element={
       <PortalLayout>
         <RoleGuard allowedRoles={['Investor', 'Admin']}>
           <InvestorDashboardPage />
         </RoleGuard>
       </PortalLayout>
     }
   />
   ```

---

## 🔐 Security & Idle Session Behavior
- **Multi-Tab Sync**: Logging out in one browser tab broadcasts a `storage` event, instantly signing out all open tabs.
- **Idle Timeout**: After 14 minutes of mouse/keyboard inactivity, a 60-second warning modal triggers. Reaching 0 seconds auto-logs out the user and redirects to `/portal/login?sessionExpired=true`.
