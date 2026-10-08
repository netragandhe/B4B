export const RANK_TITLES: Record<number, string> = {
  1: 'Associate Advisor',
  2: 'Senior Advisor',
  3: 'Managing Advisor',
  4: 'Regional Director',
  5: 'Senior Regional Director',
  6: 'Vice President',
  7: 'Senior Vice President',
  8: 'Executive Managing Director',
  9: 'National Partner',
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  status: 'loading' | 'authenticated' | 'unauthenticated'
  login: (emailOrOpts?: string | { email?: string; role?: UserRole; password?: string }, password?: string, rememberMe?: boolean) => Promise<LoginResponse>
  loginAsDemoRole: (role: UserRole) => Promise<LoginResponse>
  verifyOtp: (email: string, otp: string) => Promise<LoginResponse>
  signup: (data: SignupData) => Promise<LoginResponse>
  logout: () => Promise<void>
  switchRole: (role: UserRole) => void
  setBizProRank: (rank: number) => void
  setRank: (rank: number) => void
  logoutModalOpen: boolean
  setLogoutModalOpen: (open: boolean) => void
  isIdleWarningOpen: boolean
  idleSecondsLeft: number
  extendSession: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const IDLE_TIMEOUT_MS = 14 * 60 * 1000 // 14 mins idle threshold
const COUNTDOWN_SECONDS = 60 // 60 seconds warning countdown

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  // Idle Timer State
  const [isIdleWarningOpen, setIsIdleWarningOpen] = useState(false)
  const [idleSecondsLeft, setIdleSecondsLeft] = useState(COUNTDOWN_SECONDS)

  // 1. Session Restoration on Page Load
  useEffect(() => {
    async function initAuth() {
      try {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
          setStatus('authenticated')
        } else {
          setUser(null)
          setStatus('unauthenticated')
        }
      } catch {
        setUser(null)
        setStatus('unauthenticated')
      }
    }
    initAuth()
  }, [])

  // 2. Multi-Tab Synchronization via Window Storage Event
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'b4b_auth_token' || event.key === 'b4b_auth_user') {
        if (!event.newValue) {
          // Logged out in another tab
          setUser(null)
          setStatus('unauthenticated')
        } else if (event.newValue && event.key === 'b4b_auth_user') {
          try {
            const newUser = JSON.parse(event.newValue)
            setUser(newUser)
            setStatus('authenticated')
          } catch {
            // ignore
          }
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // 3. Idle Timeout Activity Listener
  const resetIdleTimer = useCallback(() => {
    if (isIdleWarningOpen) return
    setIdleSecondsLeft(COUNTDOWN_SECONDS)
  }, [isIdleWarningOpen])

  useEffect(() => {
    if (status !== 'authenticated') return

    let idleTimer: any
    let countdownInterval: any

    const handleUserActivity = () => {
      resetIdleTimer()
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        setIsIdleWarningOpen(true)
      }, IDLE_TIMEOUT_MS)
    }

    window.addEventListener('mousemove', handleUserActivity)
    window.addEventListener('keydown', handleUserActivity)
    window.addEventListener('click', handleUserActivity)

    idleTimer = setTimeout(() => {
      setIsIdleWarningOpen(true)
    }, IDLE_TIMEOUT_MS)

    return () => {
      clearTimeout(idleTimer)
      clearInterval(countdownInterval)
      window.removeEventListener('mousemove', handleUserActivity)
      window.removeEventListener('keydown', handleUserActivity)
      window.removeEventListener('click', handleUserActivity)
    }
  }, [status, resetIdleTimer])

  // Countdown timer effect when warning modal opens
  useEffect(() => {
    if (!isIdleWarningOpen) return

    setIdleSecondsLeft(COUNTDOWN_SECONDS)

    const interval = setInterval(() => {
      setIdleSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          handleAutoLogout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isIdleWarningOpen])

  const extendSession = () => {
    setIsIdleWarningOpen(false)
    setIdleSecondsLeft(COUNTDOWN_SECONDS)
  }

  const handleAutoLogout = async () => {
    setIsIdleWarningOpen(false)
    await logout()
    window.location.href = '/portal/login?sessionExpired=true'
  }

  // 4. Auth Methods
  const login = async (
    emailOrOpts?: string | { email?: string; role?: UserRole; password?: string },
    password?: string,
    rememberMe: boolean = true
  ): Promise<LoginResponse> => {
    let emailToUse = 'client@demo.com'
    let passToUse = 'Demo@1234'

    if (typeof emailOrOpts === 'string') {
      emailToUse = emailOrOpts
      if (password) passToUse = password
    } else if (typeof emailOrOpts === 'object' && emailOrOpts !== null) {
      if (emailOrOpts.email) emailToUse = emailOrOpts.email
      if (emailOrOpts.password) passToUse = emailOrOpts.password
      if (emailOrOpts.role) {
        return loginAsDemoRole(emailOrOpts.role)
      }
    }

    const res = await authService.login(emailToUse, passToUse, rememberMe)
    if (res.success && res.user && !res.requiresOtp) {
      setUser(res.user)
      setStatus('authenticated')
    }
    return res
  }

  const loginAsDemoRole = async (role: UserRole) => {
    const email = `${role.toLowerCase().replace(/\s+/g, '')}@demo.com`
    const user = MOCK_USERS[email] || Object.values(MOCK_USERS).find((u) => u.role === role) || MOCK_USERS['client@demo.com']
    const res = await authService.login(user.email, 'Demo@1234')
    if (res.success && res.user && !res.requiresOtp) {
      setUser(res.user)
      setStatus('authenticated')
    }
    return res
  }

  const verifyOtp = async (email: string, otp: string) => {
    const res = await authService.verifyOtp(email, otp)
    if (res.success && res.user) {
      setUser(res.user)
      setStatus('authenticated')
    }
    return res
  }

  const signup = async (data: SignupData) => {
    const res = await authService.signup(data)
    if (res.success && res.user) {
      setUser(res.user)
      setStatus('authenticated')
    }
    return res
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
    setStatus('unauthenticated')
    setLogoutModalOpen(false)
  }

  const switchRole = (newRole: UserRole) => {
    const target = Object.values(MOCK_USERS).find((u) => u.role === newRole)
    if (target) {
      setUser(target)
      localStorage.setItem('b4b_auth_user', JSON.stringify(target))
      setStatus('authenticated')
    }
  }

  const setBizProRank = (rank: number) => {
    if (user && user.role === 'Biz Pro') {
      const updated = { ...user, rank, rankTitle: `Rank ${rank}` }
      setUser(updated)
      localStorage.setItem('b4b_auth_user', JSON.stringify(updated))
    }
  }

  // 5. Branded Full Screen Loader while initializing
  if (status === 'loading') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-white space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center font-black text-xl text-white shadow-2xl animate-pulse">
          B4B
        </div>
        <div className="text-sm font-semibold tracking-wider text-slate-300">
          Loading Security Credentials...
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        status,
        login,
        loginAsDemoRole,
        verifyOtp,
        signup,
        logout,
        switchRole,
        setBizProRank,
        setRank: setBizProRank,
        logoutModalOpen,
        setLogoutModalOpen,
        isIdleWarningOpen,
        idleSecondsLeft,
        extendSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
