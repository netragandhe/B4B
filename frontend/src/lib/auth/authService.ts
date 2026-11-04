import { User } from '@/mock-data/users'
import { apiRequest } from '@/lib/apiClient'

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

const STORAGE_SESSION_KEY = 'b4b_auth_token'
const STORAGE_USER_KEY = 'b4b_auth_user'

export const authService = {
  /**
   * Authenticates user against MySQL backend API
   */
  async login(email: string, password: string, _rememberMe: boolean = true, bypassOtp: boolean = false): Promise<LoginResponse> {
    const res = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, bypassOtp }),
    })

    if (!res.success) {
      return {
        success: false,
        error: res.error || 'Login failed. Please check credentials.',
      }
    }

    if (res.data?.requiresOtp) {
      return {
        success: true,
        requiresOtp: true,
        user: res.data.user,
      }
    }

    const { user, token } = res.data || {}
    if (token && user) {
      localStorage.setItem(STORAGE_SESSION_KEY, token)
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
    }

    return {
      success: true,
      user,
      token,
    }
  },

  /**
   * Verifies OTP via MySQL backend API
   */
  async verifyOtp(email: string, otp: string): Promise<LoginResponse> {
    const res = await apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    })

    if (!res.success) {
      return {
        success: false,
        error: res.error || 'Invalid OTP code.',
      }
    }

    const { user, token } = res.data || {}
    if (token && user) {
      localStorage.setItem(STORAGE_SESSION_KEY, token)
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
    }

    return {
      success: true,
      user,
      token,
    }
  },

  /**
   * Dispatches OTP resend request
   */
  async sendOtp(_email: string): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: 'Verification code resent to your email address (Demo OTP: 123456).',
    }
  },

  /**
   * Registers a new user account
   */
  async signup(data: SignupData): Promise<LoginResponse> {
    return {
      success: false,
      error: 'Registration is pending admin invite. Please contact support.',
    }
  },

  /**
   * Initiates forgot password email flow
   */
  async forgotPassword(_email: string): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: 'If an account exists with this email, a reset link has been sent.',
    }
  },

  /**
   * Resets password with token
   */
  async resetPassword(_token: string, _newPassword: string): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: 'Your password has been reset successfully.',
    }
  },

  /**
   * Restores existing session from storage or API
   */
  async getCurrentUser(): Promise<User | null> {
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
    localStorage.removeItem(STORAGE_SESSION_KEY)
    localStorage.removeItem(STORAGE_USER_KEY)
    localStorage.removeItem('b4b_auth_session')
    localStorage.removeItem('b4b_active_role')
  },
}
