<template>
  <section
    id="technologies-logos"
    class="relative overflow-hidden bg-[var(--c-bg)] py-10 md:py-14"
    aria-labelledby="technologies-title"
  >
    <!-- Top divider -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

    <div class="mx-auto max-w-6xl px-6 mb-6">
      <p class="section-label justify-center text-center">Tech Stack</p>
    </div>

    <div class="w-full overflow-hidden">
      <h2
        id="technologies-title"
        class="sr-only"
      >
        Technologies I work with
      </h2>
      <div
        class="flex shrink-0 gap-x-14 will-change-transform"
        :style="{
          transform: `translateX(${translateX}px)`,
          transition: 'transform 0.28s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }"
      >
        <div
          v-for="(_, copyIndex) in 2"
          :key="copyIndex"
          :ref="copyIndex === 0 ? setFirstSetRef : undefined"
          class="flex shrink-0 items-center gap-x-14"
        >
          <a
            v-for="logo in props.logos"
            :key="`${copyIndex}-${logo.name}`"
            :href="logo.url ?? '#'"
            :aria-label="logo.name"
            :target="logo.url ? '_blank' : undefined"
            :rel="logo.url ? 'noopener noreferrer' : undefined"
            class="group flex h-14 w-32 shrink-0 items-center justify-center gap-2 transition-all duration-300 opacity-50 hover:opacity-100"
            @click="!logo.url && $event.preventDefault()"
          >
            <img
              v-if="!failedLogos.includes(logo.src)"
              :src="logo.src"
              :alt="logo.name"
              class="max-h-8 w-auto max-w-[32px] object-contain transition-transform duration-300 group-hover:scale-110"
              @error="markLogoFailed(logo.src)"
            />
            <span class="text-xs font-medium text-[var(--c-text-muted)] group-hover:text-[var(--c-text-secondary)] transition-colors whitespace-nowrap">
              {{ logo.name }}
            </span>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom divider -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export interface TechnologyLogo {
  name: string
  src: string
  url?: string
}

const props = withDefaults(
  defineProps<{
    logos?: TechnologyLogo[]
  }>(),
  {
    logos: () => [
      { name: 'Vue.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', url: 'https://vuejs.org' },
      { name: 'Nuxt', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg', url: 'https://nuxt.com' },
      { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', url: 'https://www.typescriptlang.org' },
      { name: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', url: 'https://tailwindcss.com' },
      { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', url: 'https://nodejs.org' },
      { name: 'Flutter', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', url: 'https://flutter.dev' },
      { name: 'Dart', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', url: 'https://dart.dev' },
      { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', url: 'https://python.org' },
      { name: 'Supabase', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', url: 'https://supabase.com' },
      { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', url: 'https://github.com' },
      { name: 'Vite', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', url: 'https://vitejs.dev' },
      { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', url: 'https://www.postgresql.org' },
    ],
  }
)

let firstSetRef: HTMLElement | null = null

function setFirstSetRef(el: unknown): void {
  firstSetRef = el instanceof HTMLElement ? el : null
}

const translateX = ref(0)
let setWidth = 0
let ticking = false

/** Quanto a faixa se move (px) por 1px de scroll vertical. */
const SCROLL_FACTOR = 0.6

function updateTranslate(): void {
  if (!firstSetRef || setWidth <= 0) return

  const totalMove = window.scrollY * SCROLL_FACTOR
  const move = ((totalMove % setWidth) + setWidth) % setWidth

  translateX.value = -move
}

function onScroll(): void {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateTranslate()
      ticking = false
    })
    ticking = true
  }
}

function measureAndUpdate(): void {
  if (!firstSetRef) return
  const w = firstSetRef.offsetWidth
  const gap = 48 // gap-x-12 = 3rem
  setWidth = w + gap
}

function onResize(): void {
  measureAndUpdate()
  updateTranslate()
}

const failedLogos = ref<string[]>([])

function markLogoFailed(src: string): void {
  if (!failedLogos.value.includes(src)) {
    failedLogos.value = [...failedLogos.value, src]
  }
}

onMounted(() => {
  nextTick(() => {
    measureAndUpdate()
    updateTranslate()
  })

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})
</script>
