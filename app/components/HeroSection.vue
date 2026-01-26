<template>
  <section
    id="hero-section"
    class="relative h-screen w-full overflow-hidden"
    :class="{ 'hero-ready': heroReady }"
  >
    <!-- Camada 1: Fundo (z-0) — sem animação -->
    <div
      class="absolute inset-0 z-0 bg-[#0a0a0a]"
      aria-hidden="true"
    />
    <div
      class="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#3d2e1e_0%,transparent_70%)]"
      aria-hidden="true"
    />

    <!-- Camada 2: Texto gigante "CREATIVE" (z-10) — parallax -->
    <div
      class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
      :style="{ transform: `translateY(${creativeY}px)` }"
    >
      <span
        class="hero-anim-fade text-[22vw] font-black uppercase leading-none select-none origin-center scale-y-[1.25] text-[rgba(201,169,98,0.2)]"
        style="--delay: 0.15s"
      >
        CREATIVE
      </span>
    </div>

    <!-- Camada 3: Imagem principal (z-20) — parallax -->
    <div
      class="absolute bottom-0 left-1/2 z-20 h-[100vh] w-full flex justify-center bg-transparent"
      aria-hidden="true"
      :style="{ transform: `translate(-50%, ${imageY}px)` }"
    >
      <img
        src="/emerson.png"
        alt="Emerson"
        class="hero-anim-fade h-full w-auto object-contain object-bottom"
        style="--delay: 0.35s"
        width="800"
        height="1200"
      />
    </div>

    <!-- Camada 4: Conteúdo frontal (z-30) — parallax -->
    <div
      class="absolute inset-0 z-30 flex flex-col"
      :style="{ transform: `translateY(${contentY}px)` }"
    >
      <div class="mx-auto w-full max-w-6xl flex-1 flex flex-col px-6">
        <!-- Bloco principal: H1 + subtítulo | VISUAL DESIGNER -->
        <div class="flex flex-1 flex-col justify-end pb-4 md:flex-row md:items-end md:justify-between md:pb-8">
          <div class="mb-6 md:mb-0">
            <h1
              class="hero-anim text-4xl font-normal uppercase tracking-tight text-[#c9a962] sm:text-5xl md:text-6xl lg:text-7xl"
              style="--delay: 0.5s"
            >
              EMERSON VALE
            </h1>
            <p
              class="hero-anim mt-2 text-sm text-neutral-500 md:text-base"
              style="--delay: 0.65s"
            >
              Code that scales. Products that last.
            </p>
          </div>
          <p
            class="hero-anim self-end text-right text-2xl font-normal uppercase tracking-wider text-[#c9a962] sm:text-3xl md:self-auto md:text-4xl lg:text-5xl"
            style="--delay: 0.8s"
          >
            SOFTWARE ENGINEER
          </p>
        </div>

        <!-- Rodapé: bio + redes sociais -->
        <footer class="shrink-0 border-t border-neutral-800/60 py-6 md:py-8">
          <p
            class="hero-anim max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base"
            style="--delay: 1s"
          >
            Between business needs and technical excellence is where I work. I design and build scalable applications, APIs, and digital products focused on performance, security, and long-term maintainability.
          </p>
          <div
            class="hero-anim mt-4 flex flex-wrap items-center gap-4"
            style="--delay: 1.2s"
          >
            <a
              href="#linkedin"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a962]/50 text-[#c9a962] transition hover:border-[#c9a962] hover:bg-[#c9a962]/10"
              aria-label="LinkedIn"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="#instagram"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a962]/50 text-[#c9a962] transition hover:border-[#c9a962] hover:bg-[#c9a962]/10"
              aria-label="Instagram"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="/cv.pdf"
              download="Emerson-Vale-CV.pdf"
              class="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#c9a962] px-4 text-sm font-medium text-[#0a0a0a] transition hover:bg-[#d4b96d]"
              aria-label="Download CV"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download CV
            </a>
          </div>
        </footer>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const scrollY = ref(0)
const heroHeight = ref(900)
const heroReady = ref(false)

function onScroll() {
  scrollY.value = typeof window !== 'undefined' ? window.scrollY : 0
}

const heroScroll = computed(() => Math.min(scrollY.value, heroHeight.value))

const creativeY = computed(() => heroScroll.value * 0.72)
const imageY = computed(() => heroScroll.value * 0.5)
const contentY = computed(() => heroScroll.value * 0.32)

onMounted(async () => {
  heroHeight.value = window.innerHeight
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  await nextTick()
  requestAnimationFrame(() => {
    heroReady.value = true
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* Fade-in suave: CREATIVE e foto (sem translate para não conflitar com parallax) */
.hero-anim-fade {
  opacity: 0;
  transition: opacity 0.6s ease;
  transition-delay: var(--delay, 0s);
}
.hero-ready .hero-anim-fade {
  opacity: 1;
}

/* Surgir suave: textos (fade + leve subida) */
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
</style>
