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

    <!-- Conteúdo principal — parallax -->
    <div
      class="relative z-10 mx-auto max-w-2xl px-6 text-center"
      :style="{ transform: `translateY(${textParallaxY}px)` }"
    >
      <h2
        id="about-me-title"
        class="text-3xl font-bold uppercase tracking-tight text-[#c9a962] sm:text-4xl md:text-5xl"
      >
        {{ title }}
      </h2>

      <div class="mt-6 space-y-4 text-base leading-relaxed text-neutral-400 md:text-lg">
        <p
          v-for="(paragraph, i) in descriptionParagraphs"
          :key="i"
        >
          {{ paragraph }}
        </p>
      </div>

      <template v-if="domainItems.length > 0">
        <p class="mt-8 text-sm font-medium uppercase tracking-wider text-[#c9a962]">
          Especialista em:
        </p>
        <ul class="mx-auto mt-3 max-w-lg list-none space-y-2 text-center text-sm text-neutral-400 md:text-base">
          <li
            v-for="(item, i) in domainItems"
            :key="i"
          >
            {{ item }}
          </li>
        </ul>
      </template>

      <div class="mt-10">
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
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
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

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    domainItems?: string[]
    contactLabel?: string
    contactHref?: string
  }>(),
  {
    title: 'ABOUT ME',
    description:
      'Lead Developer Sênior com experiência sólida no desenvolvimento de aplicativos Android e iOS, especializado em FlutterFlow, Supabase, Bubble, Xano e n8n. Atuo como líder técnico na Fraktal Software e fundei a Vale Apps, onde entrego SaaS escaláveis com integrações via API, automação de processos e foco em performance.\n\nJá participei de projetos para fintechs, clínicas, e-commerces e ferramentas internas de produtividade. Gosto de resolver problemas com soluções enxutas, escaláveis e que entregam resultado real. Sempre atual com as melhores práticas de mercado.',
    domainItems: () => [
      'Desenvolvimento de Aplicativos Mobile e Web',
      'Plataforma Android, Android Studio, Aplicativos para Android',
      'Objective-C, Java, API REST, Firebase',
      'Criação de sistemas com autenticação, pagamentos, notificações push, manutenção evolutiva e UX otimizada',
      'Stack com Supabase Realtime, Auth, Edge Functions, Xano, HTTP Requests e integração com sistemas legados',
    ],
    contactLabel: 'FALE COMIGO',
    contactHref: '#contact',
  }
)

const descriptionParagraphs = computed(() =>
  (props.description || '').split('\n\n').filter(Boolean)
)

onMounted(() => {
  updateParallax()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
