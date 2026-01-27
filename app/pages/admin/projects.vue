<template>
  <div class="min-h-screen bg-[#0a0a0a] py-16">
    <div class="container mx-auto px-6">
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-3xl font-bold uppercase tracking-tight text-[#c9a962]">
          Gerenciar Projetos
        </h1>
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/admin/testimonials"
            class="inline-flex items-center justify-center rounded-full bg-[#2a2a2a] px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-[#3a3a3a]"
          >
            Testemunhos
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
            + Novo Projeto
          </button>
        </div>
      </div>

      <!-- Lista de projetos -->
      <div
        v-if="loading"
        class="text-center py-16"
      >
        <p class="text-neutral-400">
          Carregando...
        </p>
      </div>

      <div
        v-else-if="projects.length === 0"
        class="text-center py-16"
      >
        <p class="text-neutral-400">
          Nenhum projeto cadastrado.
        </p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6"
        >
          <div
            v-if="project.image"
            class="mb-4 aspect-video overflow-hidden rounded-lg"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="text-xl font-bold text-[#c9a962] mb-2">
            {{ project.title }}
          </h3>
          <p class="text-sm text-neutral-400 mb-4 line-clamp-2">
            {{ project.description }}
          </p>
          <div class="flex gap-2">
            <button
              type="button"
              @click="openEditModal({ ...project, technologies: project.technologies ? [...project.technologies] : null })"
              class="flex-1 rounded-lg bg-[#c9a962]/20 text-[#c9a962] px-4 py-2 text-sm font-medium hover:bg-[#c9a962]/30 transition"
            >
              Editar
            </button>
            <button
              type="button"
              @click="confirmDelete({ ...project, technologies: project.technologies ? [...project.technologies] : null })"
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
            {{ editingProject ? 'Editar Projeto' : 'Novo Projeto' }}
          </h2>

          <form
            @submit.prevent="saveProject"
            class="space-y-4"
          >
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                Título *
              </label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                required
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none"
              />
            </div>

            <div>
              <label
                for="description"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                Descrição *
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                required
                rows="3"
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none"
              />
            </div>

            <div>
              <label
                for="slug"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                Slug *
              </label>
              <input
                id="slug"
                v-model="formData.slug"
                type="text"
                required
                pattern="[a-z0-9-]+"
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none"
              />
              <p class="mt-1 text-xs text-neutral-500">
                Apenas letras minúsculas, números e hífens
              </p>
            </div>

            <div>
              <label
                for="image"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                URL da Imagem
              </label>
              <input
                id="image"
                v-model="formData.image"
                type="url"
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none"
              />
            </div>

            <div>
              <label
                for="category"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                Categoria
              </label>
              <input
                id="category"
                v-model="formData.category"
                type="text"
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none"
              />
            </div>

            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2">
                <input
                  v-model="formData.featured"
                  type="checkbox"
                  class="rounded border-[#2a2a2a] bg-[#0a0a0a] text-[#c9a962] focus:ring-[#c9a962]"
                />
                <span class="text-sm text-neutral-300">Destaque</span>
              </label>
            </div>

            <div>
              <label
                for="technologies"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                Tecnologias (separadas por vírgula)
              </label>
              <input
                id="technologies"
                v-model="technologiesInput"
                type="text"
                placeholder="Vue.js, TypeScript, Tailwind CSS"
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none"
              />
            </div>

            <div>
              <label
                for="github_url"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                URL do GitHub
              </label>
              <input
                id="github_url"
                v-model="formData.github_url"
                type="url"
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none"
              />
            </div>

            <div>
              <label
                for="live_url"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                URL do Projeto
              </label>
              <input
                id="live_url"
                v-model="formData.live_url"
                type="url"
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none"
              />
            </div>

            <div>
              <label
                for="content"
                class="block text-sm font-medium text-neutral-300 mb-2"
              >
                Conteúdo (Markdown)
              </label>
              <textarea
                id="content"
                v-model="formData.content"
                rows="8"
                class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none font-mono text-sm"
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
import type { Project } from '../../../shared/types/Project'
import { useProjects } from '../../composables/useProjects'
import { useAuth } from '../../composables/useAuth'

definePageMeta({
  layout: false,
  middleware: 'auth',
})

const { projects, loading, fetchProjects, createProject, updateProject, deleteProject } = useProjects()
const { logout } = useAuth()

const handleLogout = async () => {
  await logout()
}

const showModal = ref(false)
const editingProject = ref<Project | null>(null)
const technologiesInput = ref('')

const formData = ref({
  title: '',
  description: '',
  slug: '',
  image: '',
  category: '',
  featured: false,
  content: '',
  technologies: [] as string[],
  github_url: '',
  live_url: '',
})

const openCreateModal = () => {
  editingProject.value = null
  resetForm()
  showModal.value = true
}

const openEditModal = (project: Project) => {
  editingProject.value = project
  formData.value = {
    title: project.title,
    description: project.description,
    slug: project.slug,
    image: project.image || '',
    category: project.category || '',
    featured: project.featured || false,
    content: project.content || '',
    technologies: project.technologies || [],
    github_url: project.github_url || '',
    live_url: project.live_url || '',
  }
  technologiesInput.value = (project.technologies || []).join(', ')
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingProject.value = null
  resetForm()
}

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    slug: '',
    image: '',
    category: '',
    featured: false,
    content: '',
    technologies: [],
    github_url: '',
    live_url: '',
  }
  technologiesInput.value = ''
}

const saveProject = async () => {
  try {
    const technologies = technologiesInput.value
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const projectData = {
      ...formData.value,
      technologies: technologies.length > 0 ? technologies : null,
      image: formData.value.image || null,
      category: formData.value.category || null,
      github_url: formData.value.github_url || null,
      live_url: formData.value.live_url || null,
      content: formData.value.content || null,
    }

    if (editingProject.value) {
      await updateProject(editingProject.value.id, projectData)
    } else {
      await createProject(projectData)
    }

    closeModal()
  } catch (error) {
    console.error('Erro ao salvar projeto:', error)
    alert('Erro ao salvar projeto. Tente novamente.')
  }
}

const confirmDelete = async (project: Project) => {
  if (confirm(`Tem certeza que deseja excluir o projeto "${project.title}"?`)) {
    try {
      await deleteProject(project.id)
    } catch (error) {
      console.error('Erro ao excluir projeto:', error)
      alert('Erro ao excluir projeto. Tente novamente.')
    }
  }
}

onMounted(() => {
  fetchProjects()
})
</script>
