<template>
  <div class="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
    <div class="w-full max-w-md">
      <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8">
        <h1 class="text-3xl font-bold uppercase tracking-tight text-[#c9a962] mb-8 text-center">
          Login Admin
        </h1>

        <form
          @submit.prevent="handleLogin"
          class="space-y-6"
        >
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-neutral-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              autocomplete="email"
              class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3 text-neutral-200 focus:border-[#c9a962] focus:outline-none transition"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-neutral-300 mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              autocomplete="current-password"
              class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3 text-neutral-200 focus:border-[#c9a962] focus:outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <div
            v-if="error"
            class="rounded-lg bg-red-500/20 border border-red-500/50 px-4 py-3"
          >
            <p class="text-sm text-red-400">
              {{ error }}
            </p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-lg bg-[#c9a962] px-6 py-3 text-sm font-medium text-[#0a0a0a] hover:bg-[#d4b96d] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Entrando...</span>
            <span v-else>Entrar</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../composables/useAuth'

definePageMeta({
  layout: false,
})

const { login, loading, error } = useAuth()

const formData = ref({
  email: '',
  password: '',
})

const handleLogin = async () => {
  const success = await login(formData.value.email, formData.value.password)
  if (success) {
    await navigateTo('/admin/projects')
  }
}
</script>
