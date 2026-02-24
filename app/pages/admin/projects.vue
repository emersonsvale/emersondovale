<template>
  <div class="min-h-screen bg-[#0a0a0a] py-16">
    <div class="container mx-auto px-6">
      <div class="mb-8 flex items-center justify-between flex-wrap gap-4">
        <h1 class="text-3xl font-bold uppercase tracking-tight text-[#c9a962]">
          Gerenciar Projetos
        </h1>
        <div class="flex items-center gap-4 flex-wrap">
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
        <p class="text-neutral-400 mb-4">
          Nenhum projeto cadastrado.
        </p>
        <button
          type="button"
          @click="openCreateModal"
          class="inline-flex items-center justify-center rounded-full bg-[#c9a962] px-6 py-3 text-sm font-medium text-[#0a0a0a] transition hover:bg-[#d4b96d]"
        >
          Criar primeiro projeto
        </button>
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#c9a962]/50 transition"
        >
          <div
            v-if="project.image"
            class="mb-4 aspect-video overflow-hidden rounded-lg bg-[#0a0a0a]"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            v-else
            class="mb-4 aspect-video rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] flex items-center justify-center"
          >
            <span class="text-neutral-600 text-sm">Sem imagem</span>
          </div>
          <div class="flex items-start justify-between mb-2">
            <h3 class="text-xl font-bold text-[#c9a962] flex-1">
              {{ project.title }}
            </h3>
            <div
              v-if="project.featured"
              class="ml-2 px-2 py-1 rounded text-xs font-medium bg-[#c9a962]/20 text-[#c9a962]"
            >
              Destaque
            </div>
          </div>
          <p
            v-if="project.category"
            class="text-xs text-neutral-500 mb-2"
          >
            {{ project.category }}
          </p>
          <p class="text-sm text-neutral-400 mb-4 line-clamp-2">
            {{ project.description }}
          </p>
          <div
            v-if="project.technologies && project.technologies.length > 0"
            class="flex flex-wrap gap-1 mb-4"
          >
            <span
              v-for="tech in project.technologies.slice(0, 3)"
              :key="tech"
              class="px-2 py-1 rounded text-xs bg-[#2a2a2a] text-neutral-400"
            >
              {{ tech }}
            </span>
            <span
              v-if="project.technologies.length > 3"
              class="px-2 py-1 rounded text-xs bg-[#2a2a2a] text-neutral-500"
            >
              +{{ project.technologies.length - 3 }}
            </span>
          </div>
          <div class="flex flex-col gap-2">
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
      </div>

      <!-- Modal de criação/edição -->
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-6"
        @click.self="closeModal"
      >
        <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 md:p-8 max-w-4xl w-full max-h-[95vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-[#c9a962]">
              {{ editingProject ? 'Editar Projeto' : 'Novo Projeto' }}
            </h2>
            <button
              type="button"
              @click="closeModal"
              class="text-neutral-400 hover:text-neutral-200 transition"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form
            @submit.prevent="saveProject"
            class="space-y-8"
          >
            <!-- Seção 1: Informações Básicas -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-neutral-300 border-b border-[#2a2a2a] pb-2">
                Informações Básicas
              </h3>

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
                  @input="autoGenerateSlug"
                  class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none transition"
                  placeholder="Ex: Sistema de Gestão"
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
                  class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none transition resize-none"
                  placeholder="Breve descrição do projeto..."
                />
                <p class="mt-1 text-xs text-neutral-500">
                  {{ formData.description.length }} caracteres
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none transition font-mono text-sm"
                    placeholder="sistema-gestao"
                  />
                  <p class="mt-1 text-xs text-neutral-500">
                    URL amigável: /projects/{{ formData.slug || 'slug-aqui' }}
                  </p>
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
                    class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none transition"
                    placeholder="Ex: Web App, Mobile, API"
                  />
                </div>
              </div>

              <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="formData.featured"
                    type="checkbox"
                    class="rounded border-[#2a2a2a] bg-[#0a0a0a] text-[#c9a962] focus:ring-[#c9a962] cursor-pointer"
                  />
                  <span class="text-sm text-neutral-300">Marcar como destaque</span>
                </label>
              </div>
            </div>

            <!-- Seção 2: Mídia -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-neutral-300 border-b border-[#2a2a2a] pb-2">
                Mídia
              </h3>

              <div>
                <label
                  for="image"
                  class="block text-sm font-medium text-neutral-300 mb-2"
                >
                  URL da Imagem Principal
                </label>
                <input
                  id="image"
                  v-model="formData.image"
                  type="url"
                  class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none transition font-mono text-sm"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                <p class="mt-1 text-xs text-neutral-500">
                  Esta imagem será usada como principal na página do projeto
                </p>

                <!-- Preview da imagem -->
                <div
                  v-if="formData.image"
                  class="mt-4 rounded-lg overflow-hidden border border-[#2a2a2a] bg-[#0a0a0a]"
                >
                  <div class="aspect-video bg-[#0a0a0a] flex items-center justify-center">
                    <img
                      :src="formData.image"
                      :alt="formData.title || 'Preview'"
                      class="max-w-full max-h-full object-contain"
                      @error="imageError = true"
                      @load="imageError = false"
                    />
                    <div
                      v-if="imageError"
                      class="text-neutral-600 text-sm p-4"
                    >
                      Erro ao carregar imagem. Verifique a URL.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Seção 3: Links -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-neutral-300 border-b border-[#2a2a2a] pb-2">
                Links
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    for="link_web"
                    class="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    Link Web
                  </label>
                  <input
                    id="link_web"
                    v-model="formData.link_web"
                    type="url"
                    class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none transition font-mono text-sm"
                    placeholder="https://projeto.com"
                  />
                </div>

                <div>
                  <label
                    for="link_google"
                    class="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    Google Play
                  </label>
                  <input
                    id="link_google"
                    v-model="formData.link_google"
                    type="url"
                    class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none transition font-mono text-sm"
                    placeholder="https://play.google.com/store/apps/..."
                  />
                </div>

                <div>
                  <label
                    for="link_apple"
                    class="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    App Store
                  </label>
                  <input
                    id="link_apple"
                    v-model="formData.link_apple"
                    type="url"
                    class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none transition font-mono text-sm"
                    placeholder="https://apps.apple.com/app/..."
                  />
                </div>
              </div>
            </div>

            <!-- Seção 4: Tecnologias -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-neutral-300 border-b border-[#2a2a2a] pb-2">
                Tecnologias
              </h3>

              <div>
                <label
                  for="technologies"
                  class="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Tecnologias Utilizadas
                </label>
                <input
                  id="technologies"
                  v-model="technologiesInput"
                  type="text"
                  class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none transition"
                  placeholder="Vue.js, TypeScript, Tailwind CSS, Node.js"
                />
                <p class="mt-1 text-xs text-neutral-500">
                  Separe as tecnologias por vírgula
                </p>

                <!-- Preview das tecnologias -->
                <div
                  v-if="technologiesList.length > 0"
                  class="mt-3 flex flex-wrap gap-2"
                >
                  <span
                    v-for="tech in technologiesList"
                    :key="tech"
                    class="px-3 py-1 rounded-full bg-[#2a2a2a] text-sm text-neutral-300 border border-[#3a3a3a]"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Seção 5: Conteúdo -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-neutral-300 border-b border-[#2a2a2a] pb-2">
                Conteúdo Adicional
              </h3>

              <div>
                <label
                  for="content"
                  class="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Conteúdo (Markdown)
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <textarea
                      id="content"
                      v-model="formData.content"
                      rows="12"
                      class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-200 focus:border-[#c9a962] focus:outline-none transition font-mono text-sm resize-none"
                      placeholder="## Sobre o projeto&#10;&#10;Este projeto foi desenvolvido..."
                    />
                    <p class="mt-1 text-xs text-neutral-500">
                      Use Markdown para formatação
                    </p>
                  </div>
                  <div class="hidden md:block">
                    <div class="text-xs text-neutral-500 mb-2">
                      Preview:
                    </div>
                    <div
                      class="w-full rounded-lg bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-2 text-neutral-300 text-sm min-h-[200px] max-h-[300px] overflow-y-auto prose prose-invert prose-sm max-w-none"
                      v-html="renderMarkdownPreview(formData.content)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Botões de ação -->
            <div class="flex gap-4 pt-4 border-t border-[#2a2a2a]">
              <button
                type="submit"
                :disabled="saving"
                class="flex-1 rounded-lg bg-[#c9a962] px-6 py-3 text-sm font-medium text-[#0a0a0a] hover:bg-[#d4b96d] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!saving">Salvar Projeto</span>
                <span v-else>Saving...</span>
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
const imageError = ref(false)
const saving = ref(false)

const formData = ref({
  title: '',
  description: '',
  slug: '',
  image: '',
  category: '',
  featured: false,
  content: '',
  technologies: [] as string[],
  link_web: '',
  link_google: '',
  link_apple: '',
})

const technologiesList = computed(() => {
  return technologiesInput.value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
})

const autoGenerateSlug = () => {
  if (!editingProject.value && formData.value.title) {
    formData.value.slug = formData.value.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}

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
    link_web: project.link_web || '',
    link_google: project.link_google || '',
    link_apple: project.link_apple || '',
  }
  technologiesInput.value = (project.technologies || []).join(', ')
  imageError.value = false
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
    link_web: '',
    link_google: '',
    link_apple: '',
  }
  technologiesInput.value = ''
  imageError.value = false
}

const renderMarkdownPreview = (content: string) => {
  if (!content) return '<p class="text-neutral-600">Nenhum conteúdo ainda...</p>'
  
  return content
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#c9a962]">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-[#1a1a1a] px-1 py-0.5 rounded text-xs">$1</code>')
    .replace(/## (.+?)$/gm, '<h2 class="text-lg font-bold text-neutral-200 mt-4 mb-2">$1</h2>')
    .replace(/# (.+?)$/gm, '<h1 class="text-xl font-bold text-neutral-200 mt-4 mb-2">$1</h1>')
    .replace(/\n/g, '<br>')
}

const saveProject = async () => {
  saving.value = true
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
      link_web: formData.value.link_web || null,
      link_google: formData.value.link_google || null,
      link_apple: formData.value.link_apple || null,
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
  } finally {
    saving.value = false
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

<style scoped>
.prose h1,
.prose h2 {
  color: rgb(201 169 98);
}

.prose code {
  font-family: 'Courier New', monospace;
  font-size: 0.85em;
}
</style>