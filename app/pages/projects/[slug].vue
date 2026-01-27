<template>
  <div class="min-h-screen bg-[#0a0a0a]">
    <!-- Loading -->
    <div
      v-if="loading"
      class="container mx-auto px-6 py-32 text-center"
    >
      <p class="text-neutral-400 text-lg">
        Carregando projeto...
      </p>
    </div>

    <!-- Erro -->
    <div
      v-else-if="error || !project"
      class="container mx-auto px-6 py-32 text-center"
    >
      <h1 class="text-4xl font-bold text-[#c9a962] mb-4">
        Projeto não encontrado
      </h1>
      <p class="text-neutral-400 mb-8">
        O projeto que você está procurando não existe ou foi removido.
      </p>
      <NuxtLink
        to="/"
        class="inline-flex items-center justify-center rounded-full bg-[#c9a962] px-8 py-3 text-sm font-medium text-[#0a0a0a] transition hover:bg-[#d4b96d]"
      >
        Voltar para home
      </NuxtLink>
    </div>

    <!-- Conteúdo do projeto -->
    <div
      v-else
      class="container mx-auto px-6 py-16"
    >
      <!-- Header -->
      <div class="mb-12">
        <NuxtLink
          to="/#projects"
          class="inline-flex items-center text-[#c9a962] hover:text-[#d4b96d] mb-6 transition"
        >
          <ArrowLeft class="mr-2 size-5" />
          Voltar para projetos
        </NuxtLink>

        <div
          v-if="project.category"
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#c9a962]/20 text-[#c9a962] mb-4"
        >
          {{ project.category }}
        </div>

        <h1 class="text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#c9a962] mb-4">
          {{ project.title }}
        </h1>

        <p class="text-xl text-neutral-400 mb-8 max-w-3xl">
          {{ project.description }}
        </p>

        <!-- Links -->
        <div class="flex flex-wrap gap-4">
          <a
            v-if="project.live_url"
            :href="project.live_url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded-full bg-[#c9a962] px-6 py-3 text-sm font-medium text-[#0a0a0a] transition hover:bg-[#d4b96d]"
          >
            Ver projeto
            <ArrowRight class="ml-2 size-4" />
          </a>
          <a
            v-if="project.github_url"
            :href="project.github_url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded-full border border-[#2a2a2a] px-6 py-3 text-sm font-medium text-neutral-300 hover:border-[#c9a962] transition"
          >
            Ver código
            <ArrowRight class="ml-2 size-4" />
          </a>
        </div>
      </div>

      <!-- Imagem -->
      <div
        v-if="project.image"
        class="mb-12 aspect-video overflow-hidden rounded-xl"
      >
        <img
          :src="project.image"
          :alt="project.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Tecnologias -->
      <div
        v-if="project.technologies && project.technologies.length > 0"
        class="mb-12"
      >
        <h2 class="text-xl font-bold text-[#c9a962] mb-4">
          Tecnologias
        </h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="px-4 py-2 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-sm text-neutral-300"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- Conteúdo -->
      <div
        v-if="project.content"
        class="prose prose-invert max-w-none"
      >
        <div
          class="text-neutral-300 leading-relaxed"
          v-html="renderMarkdown(project.content)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import type { Project } from '../../shared/types/Project'

const route = useRoute()
const slug = route.params.slug as string

// Debug: log do slug recebido
if (process.dev) {
  console.log('Buscando projeto com slug:', slug)
}

const { data: project, pending: loading, error: fetchError } = await useAsyncData<Project | null>(
  `project-${slug}`,
  async () => {
    try {
      const response = await $fetch<Project>(`/api/projects/${slug}`)
      if (process.dev) {
        console.log('Projeto encontrado:', response?.title)
      }
      return response
    } catch (err: any) {
      // Se for 404, retorna null (projeto não encontrado)
      if (err?.statusCode === 404 || err?.status === 404) {
        if (process.dev) {
          console.log('Projeto não encontrado (404):', slug)
        }
        return null
      }
      // Para outros erros, loga e retorna null
      console.error('Erro ao buscar projeto:', err)
      throw err
    }
  }
)

// Computed para verificar se há erro (apenas erros não-404)
const error = computed(() => {
  if (fetchError.value) {
    const statusCode = (fetchError.value as any)?.statusCode || (fetchError.value as any)?.status
    // 404 não é um erro técnico, apenas projeto não existe
    if (statusCode === 404) {
      return null
    }
    return fetchError.value
  }
  return null
})

const renderMarkdown = (content: string) => {
  // Implementação simples de markdown para HTML
  // Em produção, use uma biblioteca como marked ou markdown-it
  return content
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-[#1a1a1a] px-2 py-1 rounded">$1</code>')
    .replace(/\n/g, '<br>')
}
</script>

<style scoped>
.prose {
  color: rgb(212 212 212);
}

.prose strong {
  color: rgb(201 169 98);
  font-weight: 600;
}

.prose code {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}
</style>
