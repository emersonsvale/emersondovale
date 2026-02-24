<template>
  <section
    v-if="shouldShowSection"
    id="projects"
    ref="sectionRef"
    class="relative min-h-[600px] overflow-hidden bg-[var(--c-bg)] py-20 md:py-32"
    aria-labelledby="projects-title"
  >
    <!-- Subtle background glow -->
    <div
      class="absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_40%,rgba(201,169,98,0.05)_0%,transparent_70%)]"
      aria-hidden="true"
    />

    <div class="relative z-10 container mx-auto px-6">
      <!-- Header -->
      <div
        ref="headerRef"
        class="reveal flex flex-col items-center justify-center max-w-[540px] mx-auto mb-14 md:mb-20"
      >
        <div class="section-label">Projects</div>

        <h2
          id="projects-title"
          class="section-heading mt-4 text-center"
        >
          {{ title }}
        </h2>
        <p class="text-center mt-4 text-[var(--c-text-secondary)] text-[15px] leading-relaxed max-w-md">
          {{ description }}
        </p>
      </div>

      <!-- Loading state -->
      <div
        v-if="isLoading"
        class="flex justify-center py-16"
      >
        <div class="flex items-center gap-3 text-[var(--c-text-muted)]">
          <div class="h-5 w-5 animate-spin rounded-full border-2 border-[var(--c-gold)]/30 border-t-[var(--c-gold)]" />
          <span class="text-sm">Loading projects...</span>
        </div>
      </div>

      <div
        v-else-if="loadError"
        class="text-center py-16"
      >
        <p class="text-[var(--c-text-muted)] text-sm mb-4">
          Could not load projects right now.
        </p>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-full border border-white/[0.06] bg-[var(--c-surface)] px-6 py-2.5 text-sm font-medium text-[var(--c-text-secondary)] transition-all hover:border-[var(--c-gold)]/30 hover:text-[var(--c-gold)]"
          @click="fetchProjects()"
        >
          Try again
        </button>
      </div>

      <!-- Bento Grid -->
      <div
        v-else-if="projectsList && projectsList.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      >
        <div
          v-for="(project, index) in projectsList"
          :key="project.id"
          :class="getBentoClass(index)"
          class="reveal project-card group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--c-surface)] transition-all duration-500 block"
          :style="{ transitionDelay: `${0.1 + index * 0.08}s` }"
        >
          <!-- Background image with hover reveal -->
          <div
            v-if="project.image"
            class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 scale-105 group-hover:scale-100"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700"
              loading="lazy"
            />
          </div>

          <!-- Gradient overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-[var(--c-bg)] via-[var(--c-surface)]/90 to-[var(--c-surface)]/60"
          />

          <!-- Hover border glow -->
          <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
               style="box-shadow: inset 0 0 0 1px rgba(201,169,98,0.2);" />

          <!-- Content -->
          <div class="relative z-10 p-6 md:p-8 h-full flex flex-col min-h-[220px]">
            <!-- Badge/Tag -->
            <div
              v-if="project.category"
              class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] border border-[var(--c-gold)]/20 text-[var(--c-gold)] mb-5 w-fit"
            >
              {{ project.category }}
            </div>

            <!-- Title -->
            <h3 class="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-gold-gradient transition-colors duration-300" style="font-family: var(--font-heading)">
              {{ project.title }}
            </h3>

            <!-- Description -->
            <p class="text-sm text-[var(--c-text-secondary)] line-clamp-3 mb-6 flex-grow leading-relaxed">
              {{ project.description }}
            </p>

            <!-- Link Buttons -->
            <div class="flex items-center gap-3 mt-auto pt-4 border-t border-white/[0.04]">
              <a
                v-if="project.link_web"
                :href="project.link_web"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link-btn"
                title="Abrir site"
              >
                <ExternalLink class="size-4" />
                <span>Website</span>
              </a>
              <a
                v-if="project.link_google"
                :href="project.link_google"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link-btn"
                title="Google Play"
              >
                <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 0 1 0 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
                <span>Google Play</span>
              </a>
              <a
                v-if="project.link_apple"
                :href="project.link_apple"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link-btn"
                title="App Store"
              >
                <svg class="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <span>App Store</span>
              </a>
              <span
                v-if="!project.link_web && !project.link_google && !project.link_apple"
                class="text-xs text-[var(--c-text-muted)] uppercase tracking-[0.1em]"
              >
                Em breve
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { ExternalLink } from 'lucide-vue-next'
import type { Project } from '../../shared/types/Project'

const sectionRef = ref<HTMLElement | null>(null)
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

const { data: projectsList, status, error: loadError, refresh: fetchProjects } = useFetch<Project[]>('/api/projects', {
  default: () => [],
})

const isLoading = computed(() => status.value === 'pending')

const shouldShowSection = computed(() => {
  return isLoading.value || Boolean(loadError.value) || (projectsList.value && projectsList.value.length > 0)
})

function setupObserver() {
  const elements = sectionRef.value?.querySelectorAll('.reveal')
  if (!elements) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    },
    { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
  )

  elements.forEach((el) => observer.observe(el))
}

onMounted(() => {
  nextTick(() => setupObserver())
})

function getBentoClass(index: number): string {
  const patterns = [
    'md:col-span-2 md:row-span-2',
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-1 md:row-span-2',
    'md:col-span-1',
    'md:col-span-2',
  ]
  return patterns[index % patterns.length] || 'md:col-span-1'
}
</script>

<style scoped>
.project-card {
  will-change: transform;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,98,0.1);
}
.project-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.04);
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--c-text-secondary);
  transition: all 0.3s ease;
}
.project-link-btn:hover {
  border-color: var(--c-gold);
  color: var(--c-gold);
  background: rgba(201,169,98,0.08);
}
</style>
