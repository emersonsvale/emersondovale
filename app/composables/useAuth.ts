export const useAuth = () => {
  const user = useState<{ email: string } | null>('auth-user', () => null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const checkAuth = async () => {
    try {
      const response = await $fetch<{ authenticated: boolean; email: string }>('/api/auth/me')
      user.value = { email: response.email }
      return true
    } catch (err) {
      user.value = null
      return false
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<{ success: boolean; email: string }>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      })

      if (response.success) {
        user.value = { email: response.email }
        return true
      }
      return false
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Erro ao fazer login'
      user.value = null
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    error.value = null

    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
      })
      user.value = null
      await navigateTo('/login')
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Erro ao fazer logout'
    } finally {
      loading.value = false
    }
  }

  const isAuthenticated = computed(() => user.value !== null)

  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    isAuthenticated,
    login,
    logout,
    checkAuth,
  }
}
