<template>
  <div class="min-h-screen bg-[#0a0a0a] py-16">
    <div class="container mx-auto px-6">
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-3xl font-bold uppercase tracking-tight text-[#c9a962]">
          Gerenciar Testemunhos
        </h1>
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/admin/projects"
            class="inline-flex items-center justify-center rounded-full bg-[#2a2a2a] px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-[#3a3a3a]"
          >
            Projetos
          </NuxtLink>
          <button
            type="button"
            @click="handleLogout"
            class="inline-flex items-center justify-center rounded-full bg-[#2a2a2a] px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-[#3a3a3a]"
          >
            Sair
          </button>
          <button
            type="button"
            @click="openCreateModal"
            class="inline-flex items-center justify-center rounded-full bg-[#c9a962] px-6 py-3 text-sm font-medium text-[#0a0a0a] transition hover:bg-[#d4b96d]"
          >
            + Novo Testemunho
          </button>
        </div>
      </div>

      <!-- Lista de testemunhos -->
      <div
        v-if="loading"
        class="text-center py-16"
      >
        <p class="text-neutral-400">
          Carregando...
        </p>
      </div>

      <div
        v-else-if="testimonials.length === 0"
        class="text-center py-16"
      >
        <p class="text-neutral-400">
          Nenhum testemunho cadastrado.
        </p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6"
        >
          <div class="flex items-center gap-4 mb-4">
            <img
              :src="testimonial.image"
              :alt="testimonial.name"
              class="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 class="text-lg font-bold text-[#c9a962]">
                {{ testimonial.name }}
              </h3>
              <p class="text-sm text-neutral-400">
                {{ testimonial.role }}
              </p>
            </div>
          </div>
          <p class="text-sm text-neutral-300 mb-4 line-clamp-3">
            {{ testimonial.text }}
          </p>
          <div class="flex gap-2">
            <button
              type="button"
              @click="openEditModal(testimonial)"
              class="flex-1 rounded-lg bg-[#c9a962]/20 text-[#c9a962] px-4 py-2 text-sm font-medium hover:bg-[#c9a962]/30 transition"
            >
              Editar
            </button>
            <button
              type="button"
              @click="confirmDelete(testimonial)"
              class="flex-1 rounded-lg bg-red-500/20 text-red-400 px-4 py-2 text-sm font-medium hover:bg-red-500/30 transition"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de criação/edição -->
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
        @click.self="closeModal"
      >
        <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 class="text-2xl font-bold text-[#c9a962] mb-6">
            {{ editingTestimonial ? 'Editar Testemunho' : 'Novo Testemunho' }}
          </h2>

          <form
            @submit.prevent="saveTestimonial"
            class="space-y-4"
          >
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                Nome *
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none"
              />
            </div>

            <div>
              <label
                for="role"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                Cargo *
              </label>
              <input
                id="role"
                v-model="formData.role"
                type="text"
                required
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none"
              />
            </div>

            <div>
              <label
                for="image"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                URL da Imagem *
              </label>
              <input
                id="image"
                v-model="formData.image"
                type="url"
                required
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none"
              />
              <div
                v-if="formData.image"
                class="mt-2"
              >
                <img
                  :src="formData.image"
                  alt="Preview"
                  class="w-20 h-20 rounded-full object-cover"
                />
              </div>
            </div>

            <div>
              <label
                for="text"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                Texto do Testemunho *
              </label>
              <textarea
                id="text"
                v-model="formData.text"
                required
                rows="5"
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none"
              />
            </div>

            <div class="flex gap-4 pt-4">
              <button
                type="submit"
                class="flex-1 rounded-lg bg-[#c9a962] px-6 py-3 text-sm font-medium text-[#0a0a0a] hover:bg-[#d4b96d] transition"
              >
                Salvar
              </button>
              <button
                type="button"
                @click="closeModal"
                class="flex-1 rounded-lg bg-[#2a2a2a] px-6 py-3 text-sm font-medium text-neutral-300 hover:bg-[#3a3a3a] transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Testimonial } from '../../../shared/types/Testimonial'
import { useTestimonials } from '../../composables/useTestimonials'
import { useAuth } from '../../composables/useAuth'

definePageMeta({
  layout: false,
  middleware: 'auth',
})

const { testimonials, loading, fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials()
const { logout } = useAuth()

const handleLogout = async () => {
  await logout()
}

const showModal = ref(false)
const editingTestimonial = ref<Testimonial | null>(null)

const formData = ref({
  name: '',
  role: '',
  image: '',
  text: '',
})

const openCreateModal = () => {
  editingTestimonial.value = null
  resetForm()
  showModal.value = true
}

const openEditModal = (testimonial: Testimonial) => {
  editingTestimonial.value = testimonial
  formData.value = {
    name: testimonial.name,
    role: testimonial.role,
    image: testimonial.image,
    text: testimonial.text,
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingTestimonial.value = null
  resetForm()
}

const resetForm = () => {
  formData.value = {
    name: '',
    role: '',
    image: '',
    text: '',
  }
}

const saveTestimonial = async () => {
  try {
    const testimonialData = {
      ...formData.value,
    }

    if (editingTestimonial.value) {
      await updateTestimonial(editingTestimonial.value.id, testimonialData)
    } else {
      await createTestimonial(testimonialData)
    }

    closeModal()
  } catch (error) {
    console.error('Erro ao salvar testemunho:', error)
    alert('Erro ao salvar testemunho. Tente novamente.')
  }
}

const confirmDelete = async (testimonial: Testimonial) => {
  if (confirm(`Tem certeza que deseja excluir o testemunho de "${testimonial.name}"?`)) {
    try {
      await deleteTestimonial(testimonial.id)
    } catch (error) {
      console.error('Erro ao excluir testemunho:', error)
      alert('Erro ao excluir testemunho. Tente novamente.')
    }
  }
}

onMounted(() => {
  fetchTestimonials()
})
</script>
