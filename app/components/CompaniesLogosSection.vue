<template>
  <section
    id="companies-logos"
    class="relative flex h-[100px] items-center overflow-hidden bg-[#0a0a0a] py-4"
    aria-labelledby="companies-title"
  >
    <div class="w-full overflow-hidden">
      <h2
        id="companies-title"
        class="sr-only"
      >
        Empresas em que trabalhei
      </h2>
      <div
        class="flex shrink-0 gap-x-12 will-change-transform"
        :style="{
          transform: `translateX(${translateX}px)`,
          transition: 'transform 0.28s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }"
      >
        <div
          v-for="(_, copyIndex) in 2"
          :key="copyIndex"
          :ref="copyIndex === 0 ? setFirstSetRef : undefined"
          class="flex shrink-0 items-center gap-x-12"
        >
          <a
            v-for="logo in props.logos"
            :key="`${copyIndex}-${logo.name}`"
            :href="logo.url ?? '#'"
            :aria-label="logo.name"
            :target="logo.url ? '_blank' : undefined"
            :rel="logo.url ? 'noopener noreferrer' : undefined"
            class="flex h-12 w-28 shrink-0 items-center justify-center transition opacity-70 hover:opacity-100"
            @click="!logo.url && $event.preventDefault()"
          >
            <img
              v-if="!failedLogos.includes(logo.src)"
              :src="logo.src"
              :alt="logo.name"
              class="max-h-10 w-auto max-w-[100px] object-contain object-center"
              @error="markLogoFailed(logo.src)"
            />
            <span
              v-else
              class="text-center text-xs font-medium uppercase tracking-wider text-neutral-500"
            >
              {{ logo.name }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export interface CompanyLogo {
  name: string
  src: string
  url?: string
}

const props = withDefaults(
  defineProps<{
    logos?: CompanyLogo[]
  }>(),
  {
    logos: () => [
      { name: 'Empresa 1', src: '/logos/logo-vale-apps.png' },
      { name: 'Empresa 2', src: '/logos/Logo-01.svg' },
      { name: 'Empresa 3', src: '/logos/guara.png' },
      { name: 'Empresa 4', src: '/logos/ceuma.png' },
      { name: 'Empresa 5', src: '/logos/mvp.png' },
      { name: 'Empresa 1', src: '/logos/logo-vale-apps.png' },
      { name: 'Empresa 2', src: '/logos/Logo-01.svg' },
      { name: 'Empresa 3', src: '/logos/guara.png' },
      { name: 'Empresa 4', src: '/logos/ceuma.png' },
      { name: 'Empresa 5', src: '/logos/mvp.png' },
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
