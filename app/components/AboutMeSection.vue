<template>
  <section
    ref="sectionRef"
    id="about-me"
    class="relative min-h-[480px] overflow-hidden bg-[#0a0a0a] py-16 md:py-24"
    aria-labelledby="about-me-title"
  >
    <!-- Gradiente sutil de fundo (consistente com Hero) -->
    <div
      class="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,#3d2e1e_0%,transparent_60%)] opacity-70"
      aria-hidden="true"
    />

    <!-- Layout: imagem à esquerda, texto à direita -->
    <div
      class="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 md:flex-row md:items-center md:gap-12 lg:gap-16"
      :style="{ transform: `translateY(${textParallaxY}px)` }"
    >
      <!-- Foto à esquerda -->
      <div class="flex-shrink-0 md:w-[min(320px,40%)]">
        <img
          src="/image%20(2).png"
          alt="Emerson Vale - Software Engineer"
          class="w-full rounded-xl object-cover border-0"
          width="320"
          height="400"
          loading="lazy"
        />
      </div>

      <!-- Conteúdo principal (texto à direita) -->
      <div class="flex min-w-0 flex-1 flex-col text-center md:text-left">
        <div
          ref="headerRef"
          class="flex flex-col items-center md:items-start about-me-header"
        >
          <div class="flex justify-center md:justify-start">
            <div class="border border-neutral-800/60 py-1 px-4 rounded-lg text-neutral-400">About Me</div>
          </div>

          <h2
            id="about-me-title"
            class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-[#c9a962]"
          >
            {{ title }}
          </h2>
        </div>

        <div class="mt-6 space-y-4 text-base leading-relaxed text-neutral-400 md:text-lg">
          <p
            v-for="(paragraph, i) in descriptionParagraphs"
            :key="i"
          >
            {{ paragraph }}
          </p>
        </div>

        <template v-if="domainItems && domainItems.length > 0">
          <p class="mt-8 text-sm font-medium uppercase tracking-wider text-[#c9a962]">
            Specialist in:
          </p>
          <ul class="mt-3 max-w-lg list-none space-y-2 text-center text-sm text-neutral-400 md:text-left md:text-base">
            <li
              v-for="(item, i) in domainItems"
              :key="i"
            >
              {{ item }}
            </li>
          </ul>
        </template>

        <div class="mt-10 flex justify-center md:justify-start">
          <a
            :href="contactHref"
            class="inline-flex items-center justify-center rounded-full bg-[#c9a962] px-8 py-3 text-sm font-medium text-[#0a0a0a] transition hover:bg-[#d4b96d]"
          >
            {{ contactLabel }}
          </a>
        </div>

        <!-- Slot para conteúdo extra (links, badges, etc.) -->
        <div v-if="$slots.extra" class="mt-8">
          <slot name="extra" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const textParallaxY = ref(0)

let ticking = false

function updateParallax() {
  const rect = sectionRef.value?.getBoundingClientRect()
  if (!rect) return
  textParallaxY.value = rect.top * 0.12
  ticking = false
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(updateParallax)
    ticking = true
  }
}

function setHeaderVisible(el: HTMLElement) {
  el.classList.add('about-me-header-visible')
}

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  return rect.top < vh * 0.85 && rect.bottom > 0
}

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    domainItems?: string[]
    contactLabel?: string
    contactHref?: string
  }>(),
  {
    title: 'Who I am',
    description:
      'I am a senior developer focused on building solid, scalable, and easy-to-maintain digital products. I currently work as a lead developer at Fraktal Software and I am also the founder of Vale Apps, where I create SaaS solutions with API integrations, process automation, and growth-oriented architectures.\n\nI have hands-on experience in projects for fintechs, healthcare clinics, e-commerce platforms, and internal systems, participating from early planning to production delivery. I enjoy working on simple, well-structured solutions that truly solve business problems, without adding unnecessary complexity.\n\nIn my daily work, I mainly develop mobile and web applications, build systems with authentication, payments, notifications, and integrations, and design scalable backends using Supabase.',
    contactLabel: 'GET IN TOUCH',
    contactHref: '#contact',
  }
)

const descriptionParagraphs = computed(() =>
  (props.description || '').split('\n\n').filter(Boolean)
)

onMounted(() => {
  updateParallax()
  window.addEventListener('scroll', onScroll, { passive: true })

  nextTick(() => {
    const header = headerRef.value
    if (!header) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeaderVisible(entry.target as HTMLElement)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(header)

    if (isInViewport(header)) {
      setHeaderVisible(header)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.about-me-header {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.1s;
}

.about-me-header-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
