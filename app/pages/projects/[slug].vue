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
      class="min-h-screen bg-[#0a0a0a] flex items-center justify-center"
    >
      <div class="text-center px-6">
        <h1 class="text-4xl font-bold text-[#c9a962] mb-4">
          Projeto não encontrado
        </h1>
        <p class="text-neutral-400 mb-8">
          O projeto que você está procurando não existe ou foi removido.
        </p>
        <NuxtLink
          to="/#projects"
          class="inline-flex items-center justify-center rounded-full bg-[#c9a962] px-8 py-3 text-sm font-medium text-[#0a0a0a] transition hover:bg-[#d4b96d]"
        >
          Voltar para projetos
        </NuxtLink>
      </div>
    </div>

    <!-- Conteúdo do projeto -->
    <div v-else>
      <!-- Hero Section Fullscreen com Imagem -->
      <section
        class="relative h-screen w-full overflow-hidden"
        :class="{ 'hero-ready': heroReady }"
      >
        <!-- Imagem de fundo fullscreen -->
        <div
          v-if="project.image"
          class="absolute inset-0 z-0"
        >
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover"
          />
          <!-- Overlay escuro para melhor legibilidade -->
          <div class="absolute inset-0 bg-[#0a0a0a]/60" />
          <!-- Gradiente sutil -->
          <div
            class="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,#3d2e1e_0%,transparent_70%)] opacity-50"
            aria-hidden="true"
          />
        </div>
        <div
          v-else
          class="absolute inset-0 z-0 bg-[#0a0a0a]"
        />

        <!-- Botão Voltar (sticky no topo) -->
        <div class="absolute top-0 left-0 right-0 z-50">
          <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
              <NuxtLink
                to="/#projects"
                class="inline-flex items-center text-white hover:text-[#c9a962] transition font-medium text-sm backdrop-blur-sm bg-[#0a0a0a]/30 px-4 py-2 rounded-full border border-white/10"
              >
                <ArrowLeft class="mr-2 size-4" />
                Voltar
              </NuxtLink>
              <div
                v-if="project.category"
                class="px-3 py-1 rounded-full text-xs font-medium bg-[#c9a962]/20 text-[#c9a962] border border-[#c9a962]/30 backdrop-blur-sm"
              >
                {{ project.category }}
              </div>
            </div>
          </div>
        </div>

        <!-- Conteúdo sobreposto (título e descrição) -->
        <div class="relative z-10 h-full flex items-center justify-center">
          <div class="mx-auto w-full max-w-6xl flex-1 flex flex-col px-6">
            <!-- Bloco principal: H1 + subtítulo -->
            <div class="flex flex-1 flex-col justify-end pb-4 md:pb-8">
              <div class="mb-6 md:mb-0">
                <h1
                  class="hero-anim text-4xl font-normal uppercase tracking-tight text-[#c9a962] sm:text-5xl md:text-6xl lg:text-7xl"
                  style="--delay: 0.5s"
                >
                  {{ project.title }}
                </h1>
                <p
                  class="hero-anim mt-2 text-sm text-neutral-400 md:text-base"
                  style="--delay: 0.65s"
                >
                  {{ project.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicador de scroll (opcional) -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div class="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      <!-- Seção 1: Sobre o Projeto (Fundo Escuro) -->
      <section class="bg-[#0a0a0a] py-16 md:py-24">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <div class="space-y-6">
              <div class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#c9a962]/20 text-[#c9a962] uppercase tracking-wide border border-[#c9a962]/30">
                Sobre o projeto
              </div>
              <h2 class="text-4xl md:text-5xl font-bold text-[#c9a962] uppercase tracking-tight">
                {{ project.title }}
              </h2>
              <p class="text-xl text-neutral-400 font-light">
                {{ project.category || 'Projeto' }}
              </p>
              <p class="text-neutral-500 leading-relaxed">
                {{ project.description }}
              </p>
              <div
                v-if="project.content"
                class="text-neutral-400 leading-relaxed prose prose-invert max-w-none"
                v-html="renderMarkdown(project.content)"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Seção 4: Tecnologias e Links (Fundo Escuro) -->
      <section class="bg-[#1a1a1a] py-16 md:py-24">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <!-- Seção de código (simulando linhas de código) -->
            <div class="mb-16 font-mono text-sm">
              <div class="space-y-2 opacity-20">
                <div
                  v-for="i in 8"
                  :key="i"
                  class="flex items-center gap-4 text-neutral-600"
                >
                  <span class="text-neutral-700 w-8 text-right">{{ i }}</span>
                  <span
                    :class="{
                      'text-[#c9a962]': i % 3 === 0,
                      'text-neutral-500': i % 3 === 1,
                      'text-neutral-400': i % 3 === 2,
                    }"
                  >
                    {{ i % 3 === 0 ? 'const' : i % 3 === 1 ? 'function' : 'return' }} project = {{ '{' }}
                    {{ i % 2 === 0 ? '...' : '' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Tecnologias -->
            <div
              v-if="project.technologies && project.technologies.length > 0"
              class="mb-12"
            >
              <h2 class="text-3xl font-bold text-[#c9a962] mb-6 uppercase tracking-tight">
                Tecnologias
              </h2>
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-4 py-2 rounded-full bg-[#0a0a0a] border border-[#2a2a2a] text-sm text-neutral-300 hover:border-[#c9a962] transition"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Links de ação -->
            <div class="flex flex-wrap gap-4">
              <a
                v-if="project.live_url"
                :href="project.live_url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center rounded-full bg-[#c9a962] px-8 py-4 text-sm font-medium text-[#0a0a0a] transition hover:bg-[#d4b96d] uppercase tracking-wide"
              >
                Ver projeto
                <ArrowRight class="ml-2 size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Seção Final: Imagem Grande (Fundo Escuro) -->
      <section class="relative bg-[#1a1a1a] py-16 md:py-24 overflow-hidden">
        <div class="container mx-auto px-6">
          <div class="max-w-5xl mx-auto">
            <!-- Imagem grande centralizada -->
            <div
              v-if="project.image"
              class="relative"
            >
              <div class="relative overflow-hidden rounded-xl border border-[#2a2a2a] hover:scale-[1.02] transition-transform duration-300 shadow-2xl">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import type { Project } from '../../shared/types/Project'
import { ref, computed, onMounted, nextTick } from 'vue'

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

const heroReady = ref(false)

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => {
    heroReady.value = true
  })
})

const renderMarkdown = (content: string) => {
  // Implementação simples de markdown para HTML
  // Em produção, use uma biblioteca como marked ou markdown-it
  return content
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#c9a962]">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-[#1a1a1a] px-2 py-1 rounded border border-[#2a2a2a] text-[#c9a962]">$1</code>')
    .replace(/## (.+?)$/gm, '<h2 class="text-2xl font-bold text-[#c9a962] mt-6 mb-3">$1</h2>')
    .replace(/# (.+?)$/gm, '<h1 class="text-3xl font-bold text-[#c9a962] mt-6 mb-3">$1</h1>')
    .replace(/\n/g, '<br>')
}
</script>


<style scoped>
/* Animações suaves para scroll */
section {
  scroll-margin-top: 80px;
}

/* Transições suaves para imagens */
img {
  transition: transform 0.3s ease;
}

/* Animação de fade-in para seções */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

section > div {
  animation: fadeInUp 0.6s ease-out;
}

/* Surgir suave: textos (fade + leve subida) - igual ao hero da index */
.hero-anim {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.55s ease, transform 0.55s ease;
  transition-delay: var(--delay, 0s);
}

.hero-ready .hero-anim {
  opacity: 1;
  transform: translateY(0);
}

/* Estilos para código */
.prose code {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  background-color: rgba(26, 26, 26, 0.5);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
}

.prose strong {
  color: #c9a962;
  font-weight: 600;
}

.prose h1,
.prose h2 {
  color: #c9a962;
}
</style>