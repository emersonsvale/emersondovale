<template>
  <section
    ref="sectionRef"
    id="contact"
    class="relative min-h-[600px] overflow-hidden bg-[#0a0a0a] py-16 md:py-24"
    aria-labelledby="contact-title"
  >
    <!-- Gradiente sutil de fundo -->
    <div
      class="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,#3d2e1e_0%,transparent_60%)] opacity-70"
      aria-hidden="true"
    />

    <!-- Conteúdo principal -->
    <div class="relative z-10 mx-auto max-w-4xl px-6">
      <div
        ref="headerRef"
        class="flex flex-col items-center justify-center max-w-[540px] mx-auto contact-header"
      >
        <div class="flex justify-center">
          <div class="border border-neutral-800/60 py-1 px-4 rounded-lg text-neutral-400">Contact</div>
        </div>

        <h2
          id="contact-title"
          class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-[#c9a962]"
        >
          {{ title }}
        </h2>
        <p class="text-center mt-5 opacity-75 text-neutral-400">
          {{ subtitle }}
        </p>
      </div>

      <div class="mt-12">
        <!-- Informações de contato -->
        <div class="max-w-2xl mx-auto">
          <div class="flex flex-row flex-wrap justify-center items-center gap-4 md:gap-6">
            <a
              href="mailto:emersonsousa.vale@gmail.com"
              class="flex items-center gap-3 text-neutral-300 transition hover:text-[#c9a962]"
            >
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a962]/30 bg-[#c9a962]/5">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <span class="text-sm md:text-base">E-mail</span>
            </a>

            <a
              href="https://www.linkedin.com/in/emersonsvale/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-neutral-300 transition hover:text-[#c9a962]"
            >
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a962]/30 bg-[#c9a962]/5">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span class="text-sm md:text-base">LinkedIn</span>
            </a>

            <a
              href="https://github.com/emersonsvale"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-neutral-300 transition hover:text-[#c9a962]"
            >
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a962]/30 bg-[#c9a962]/5">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-1.003-.013-1.97-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="text-sm md:text-base">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    email?: string
  }>(),
  {
    title: "Let's work together",
    subtitle: "Let's work together? Get in touch and let's talk about your next project.",
    email: 'emersonsousa.vale@gmail.com',
  }
)


onMounted(() => {
  if (headerRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('contact-header-visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(headerRef.value)
  }
})
</script>

<style scoped>
.contact-header {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.1s;
}

.contact-header-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
