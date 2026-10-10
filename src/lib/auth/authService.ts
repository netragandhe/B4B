import { MOCK_USERS, User, DEMO_PASSWORD } from '@/mock-data/users'

export interface LoginResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
  requiresOtp?: boolean
  isPending?: boolean
}

export interface SignupData {
  accountType: User['role']
  fullName: string
  email: string
  phone: string
  password: string
  companyName?: string
  industry?: string
  state?: string
  referralCode?: string
  territory?: string
  partnerType?: string
  socialLink?: string
  website?: string
  skills?: string[]
}

const delay = (ms: number = 750) => new Promise((resolve) => setTimeout(resolve, ms))

const STORAGE_SESSION_KEY = 'b4b_auth_token'
const STORAGE_USER_KEY = 'b4b_auth_user'

export const authService = {
  /**
   * Authenticates user against mock user database
   */
  async login(email: string, password: string, rememberMe: boolean = true, bypassOtp: boolean = false): Promise<LoginResponse> {
    await delay(300)

    const normalizedEmail = email.toLowerCase().trim()
    const user = MOCK_USERS[normalizedEmail]

    if (!user) {
      return {
        success: false,
        error: 'No account found with this email address.',
      }
    }

    if (password !== DEMO_PASSWORD) {
      return {
        success: false,
        error: 'Invalid password. Please check your credentials.',
      }
    }

    if (user.status === 'pending') {
      return {
        success: false,
        isPending: true,
        error: 'Your account application is currently pending approval by executive admin.',
      }
    }

    if (user.status === 'suspended') {
      return {
        success: false,
        error: 'This account has been temporarily suspended. Please contact support.',
      }
    }

    // Require OTP 2-step verification for Admin and Biz Pro roles only when not in 1-click demo bypass
    if (!bypassOtp && (user.role === 'Admin' || user.role === 'Biz Pro')) {
      return {
        success: true,
        requiresOtp: true,
        user,
      }
    }

    const mockToken = `b4b_jwt_${user.id}_${Date.now()}`
    localStorage.setItem(STORAGE_SESSION_KEY, mockToken)
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))

    return {
      success: true,
      user,
      token: mockToken,
    }
  },

  /**
   * Verifies 6-digit OTP code (Demo OTP is 123456)
   */
  async verifyOtp(email: string, otp: string): Promise<LoginResponse> {
    await delay(600)

    const normalizedEmail = email.toLowerCase().trim()
    const user = MOCK_USERS[normalizedEmail]

    if (otp !== '123456') {
      return {
        success: false,
        error: 'Invalid verification code. Use demo code: 123456.',
      }
    }

    if (!user) {
      return {
        success: false,
        error: 'Account verification error.',
      }
    }

    const mockToken = `b4b_jwt_${user.id}_${Date.now()}`
    localStorage.setItem(STORAGE_SESSION_KEY, mockToken)
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))

    return {
      success: true,
      user,
      token: mockToken,
    }
  },

  /**
   * Dispatches OTP resend request
   */
  async sendOtp(email: string): Promise<{ success: boolean; message: string }> {
    await delay(500)
    return {
      success: true,
      message: 'Verification code resent to your email address (Demo OTP: 123456).',
    }
  },

  /**
   * Registers a new user account
   */
  async signup(data: SignupData): Promise<LoginResponse> {
    await delay(850)

    const normalizedEmail = data.email.toLowerCase().trim()
    if (MOCK_USERS[normalizedEmail]) {
      return {
        success: false,
        error: 'An account with this email address already exists.',
      }
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.fullName,
      email: normalizedEmail,
      role: data.accountType,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      status: 'active',
      company: data.companyName || `${data.fullName}'s Organization`,
      title: data.accountType === 'Biz Pro' ? 'Sales Representative' : 'Member',
      rank: data.accountType === 'Biz Pro' ? 1 : undefined,
      rankTitle: data.accountType === 'Biz Pro' ? 'Rookie (Rank 1)' : undefined,
      phone: data.phone,
      createdAt: new Date().toISOString().split('T')[0],
    }

    MOCK_USERS[normalizedEmail] = newUser

    const mockToken = `b4b_jwt_${newUser.id}_${Date.now()}`
    localStorage.setItem(STORAGE_SESSION_KEY, mockToken)
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser))

    return {
      success: true,
      user: newUser,
      token: mockToken,
    }
  },

  /**
   * Initiates forgot password email flow
   */
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    await delay(700)
    const normalizedEmail = email.toLowerCase().trim()
    if (!MOCK_USERS[normalizedEmail]) {
      return {
        success: false,
        message: 'If an account exists with this email, a reset link has been sent.',
      }
    }
    return {
      success: true,
      message: 'Password reset link dispatched to your inbox.',
    }
  },

  /**
   * Resets password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    await delay(750)
    return {
      success: true,
      message: 'Your password has been reset successfully. Please log in with your new credentials.',
    }
  },

  /**
   * Restores existing session from storage
   */
  async getCurrentUser(): Promise<User | null> {
    await delay(300)
    const token = localStorage.getItem(STORAGE_SESSION_KEY)
    const userStr = localStorage.getItem(STORAGE_USER_KEY)
    if (!token || !userStr) return null

    try {
      const user: User = JSON.parse(userStr)
      return user
    } catch {
      return null
    }
  },

  /**
   * Logs out user session
   */
  async logout(): Promise<void> {
    await delay(300)
    localStorage.removeItem(STORAGE_SESSION_KEY)
    localStorage.removeItem(STORAGE_USER_KEY)
    localStorage.removeItem('b4b_auth_session')
    localStorage.removeItem('b4b_active_role')
  },
}
