<template>
  <section
    v-if="shouldShowSection"
    id="projects"
    class="relative min-h-[600px] overflow-hidden bg-[#0a0a0a] py-16 md:py-24 lg:py-32"
    aria-labelledby="projects-title"
  >
    <!-- Gradiente sutil de fundo -->
    <div
      class="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,#3d2e1e_0%,transparent_60%)] opacity-70"
      aria-hidden="true"
    />

    <div class="relative z-10 container mx-auto px-6">
      <!-- Cabeçalho -->
      <div
        ref="headerRef"
        class="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-12 md:mb-16 projects-header"
      >
        <div class="flex justify-center">
          <div class="border border-neutral-800/60 py-1 px-4 rounded-lg text-neutral-400">Projects</div>
        </div>

        <h2
          id="projects-title"
          class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-[#c9a962]"
        >
          {{ title }}
        </h2>
        <p class="text-center mt-5 opacity-75 text-neutral-400">
          {{ description }}
        </p>
      </div>

      <!-- Loading state -->
      <div
        v-if="isLoading"
        class="text-center py-16"
      >
        <p class="text-neutral-400 text-lg">
          Loading projects...
        </p>
      </div>

      <!-- Bento Grid -->
      <div
        v-else-if="projectsList && projectsList.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <NuxtLink
          v-for="(project, index) in projectsList"
          :key="project.id"
          :to="`/projects/${project.slug}`"
          :class="getBentoClass(index)"
          class="group relative overflow-hidden rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c9a962]/50 transition-all duration-300 hover:scale-[1.02]"
        >
          <!-- Imagem de fundo -->
          <div
            v-if="project.image"
            class="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- Gradiente overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"
          />

          <!-- Conteúdo -->
          <div class="relative z-10 p-6 md:p-8 h-full flex flex-col">
            <!-- Badge/Tag -->
            <div
              v-if="project.category"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#c9a962]/20 text-[#c9a962] mb-4 w-fit"
            >
              {{ project.category }}
            </div>

            <!-- Título -->
            <h3 class="text-xl md:text-2xl font-bold text-[#c9a962] mb-3 group-hover:text-[#d4b96d] transition-colors">
              {{ project.title }}
            </h3>

            <!-- Descrição -->
            <p class="text-sm md:text-base text-neutral-400 line-clamp-3 mb-4 flex-grow">
              {{ project.description }}
            </p>

            <!-- Footer com link -->
            <div class="flex items-center text-sm font-medium text-[#c9a962] mt-auto">
              Ver projeto
              <ArrowRight class="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import type { Project } from '../../shared/types/Project'
import { useProjects } from '../composables/useProjects'

const headerRef = ref<HTMLElement | null>(null)

export interface ProjectsSectionProps {
  title?: string
  description?: string
}

const props = withDefaults(
  defineProps<ProjectsSectionProps>(),
  {
    title: 'Featured work',
    description:
      'A selection of my most recent projects, showcasing skills in web development, mobile and innovative solutions.',
  }
)

const { projects, loading, fetchProjects } = useProjects()

const projectsList = computed(() => projects.value)
const isLoading = computed(() => loading.value)

// Só mostra a seção se estiver carregando ou se houver projetos
const shouldShowSection = computed(() => {
  return isLoading.value || (projectsList.value && projectsList.value.length > 0)
})

onMounted(() => {
  fetchProjects()
  
  if (headerRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('projects-header-visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(headerRef.value)
  }
})

// Função para determinar classes do bento grid (diferentes tamanhos)
function getBentoClass(index: number): string {
  const patterns = [
    'md:col-span-2 md:row-span-2', // Grande - primeira posição
    'md:col-span-1', // Normal
    'md:col-span-1', // Normal
    'md:col-span-1 md:row-span-2', // Alto
    'md:col-span-1', // Normal
    'md:col-span-2', // Largo
  ]

  return patterns[index % patterns.length] || 'md:col-span-1'
}
</script>

<style scoped>
.projects-header {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.1s;
}

.projects-header-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
