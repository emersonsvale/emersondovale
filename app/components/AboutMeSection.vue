<template>
  <section
    ref="sectionRef"
    id="about-me"
    class="relative min-h-[480px] overflow-hidden bg-[var(--c-bg)] py-20 md:py-32"
    aria-labelledby="about-me-title"
  >
    <!-- Subtle background glow -->
    <div
      class="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_50%,rgba(201,169,98,0.06)_0%,transparent_70%)]"
      aria-hidden="true"
    />

    <div
      class="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 md:flex-row md:items-start md:gap-16 lg:gap-20"
    >
      <!-- Photo column -->
      <div class="flex-shrink-0 w-full md:w-[min(340px,38%)]">
        <div
          ref="imageRef"
          class="reveal relative"
        >
          <!-- Decorative frame -->
          <div class="absolute -top-3 -left-3 h-24 w-24 border-t-2 border-l-2 border-[var(--c-gold)]/30 rounded-tl-2xl" aria-hidden="true" />
          <div class="absolute -bottom-3 -right-3 h-24 w-24 border-b-2 border-r-2 border-[var(--c-gold)]/30 rounded-br-2xl" aria-hidden="true" />
          <img
            src="/image%20(2).png"
            alt="Emerson Vale - Software Engineer"
            class="w-full rounded-xl object-cover"
            width="340"
            height="420"
            loading="lazy"
          />
          <!-- Subtle shine overlay -->
          <div class="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
        </div>

        <!-- Stats row -->
        <div class="mt-8 grid grid-cols-3 gap-3">
          <div
            v-for="(stat, i) in stats"
            :key="i"
            class="reveal text-center rounded-lg border border-white/[0.06] bg-[var(--c-surface)] p-3"
            :style="{ transitionDelay: `${0.2 + i * 0.1}s` }"
          >
            <div class="text-xl font-bold text-gold-gradient" style="font-family: var(--font-heading)">{{ stat.value }}</div>
            <div class="mt-1 text-[10px] uppercase tracking-[0.15em] text-[var(--c-text-muted)]">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Content column -->
      <div class="flex min-w-0 flex-1 flex-col text-center md:text-left">
        <div
          ref="headerRef"
          class="reveal flex flex-col items-center md:items-start"
        >
          <div class="section-label">About Me</div>

          <h2
            id="about-me-title"
            class="section-heading mt-4"
          >
            {{ title }}
          </h2>
        </div>

        <div class="reveal mt-8 space-y-5 text-[15px] leading-[1.8] text-[var(--c-text-secondary)] md:text-base" style="transition-delay: 0.2s">
          <p
            v-for="(paragraph, i) in descriptionParagraphs"
            :key="i"
          >
            {{ paragraph }}
          </p>
        </div>

        <template v-if="domainItems && domainItems.length > 0">
          <div class="reveal mt-10" style="transition-delay: 0.3s">
            <p class="section-label mb-4">
              Specialist in
            </p>
            <div class="flex flex-wrap justify-center md:justify-start gap-2">
              <span
                v-for="(item, i) in domainItems"
                :key="i"
                class="inline-flex items-center rounded-full border border-white/[0.06] bg-[var(--c-surface)] px-4 py-1.5 text-xs font-medium text-[var(--c-text-secondary)] transition-colors hover:border-[var(--c-gold)]/30 hover:text-[var(--c-gold)]"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </template>

        <div class="reveal mt-10 flex justify-center md:justify-start" style="transition-delay: 0.4s">
          <a
            :href="contactHref"
            class="group inline-flex items-center gap-3 rounded-full border border-[var(--c-gold)]/40 bg-[var(--c-gold)]/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--c-gold)] transition-all duration-300 hover:bg-[var(--c-gold)] hover:text-[var(--c-bg)]"
          >
            {{ contactLabel }}
            <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

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
const imageRef = ref<HTMLElement | null>(null)

const stats = [
  { value: '5+', label: 'Years' },
  { value: '20+', label: 'Projects' },
  { value: '10+', label: 'Clients' },
]

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
    { threshold: 0.05, rootMargin: '0px 0px -8% 0px' }
  )

  elements.forEach((el) => observer.observe(el))
}

onMounted(() => {
  nextTick(() => {
    setupObserver()
  })
})
</script>
