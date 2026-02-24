<template>
  <section
    ref="sectionRef"
    id="contact"
    class="relative min-h-[500px] overflow-hidden bg-[var(--c-bg)] py-20 md:py-32"
    aria-labelledby="contact-title"
  >
    <!-- Dramatic background glow -->
    <div
      class="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(201,169,98,0.08)_0%,transparent_70%)]"
      aria-hidden="true"
    />

    <!-- Content -->
    <div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
      <div
        ref="headerRef"
        class="reveal flex flex-col items-center"
      >
        <div class="section-label">Contact</div>

        <h2
          id="contact-title"
          class="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
          style="font-family: var(--font-heading)"
        >
          {{ title }}
        </h2>
        <p class="mt-5 text-[var(--c-text-secondary)] text-[15px] leading-relaxed max-w-md">
          {{ subtitle }}
        </p>
      </div>

      <!-- Email CTA -->
      <div class="reveal mt-12" style="transition-delay: 0.15s">
        <a
          :href="`mailto:${email}`"
          class="group inline-flex items-center gap-3 rounded-full border border-[var(--c-gold)]/30 bg-[var(--c-gold)]/5 px-8 py-4 text-lg font-semibold text-[var(--c-gold)] transition-all duration-500 hover:bg-[var(--c-gold)] hover:text-[var(--c-bg)] hover:scale-105 hover:shadow-[0_0_40px_rgba(201,169,98,0.2)]"
          style="font-family: var(--font-heading)"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          {{ email }}
        </a>
      </div>

      <!-- Social links -->
      <div class="reveal mt-10 flex justify-center items-center gap-4" style="transition-delay: 0.25s">
        <span class="text-xs uppercase tracking-[0.2em] text-[var(--c-text-muted)]">Or find me on</span>
        <span class="h-px w-8 bg-white/10" aria-hidden="true" />
        <div class="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/emersonsvale/"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-social-icon"
            aria-label="LinkedIn"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          <a
            href="https://github.com/emersonsvale"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-social-icon"
            aria-label="GitHub"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-1.003-.013-1.97-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
            </svg>
          </a>

          <a
            href="https://www.instagram.com/emersonsvale/"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-social-icon"
            aria-label="Instagram"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    email?: string
  }>(),
  {
    title: "Let's build something great",
    subtitle: "Have a project in mind? Let's talk about how I can help bring it to life.",
    email: 'emersonsousa.vale@gmail.com',
  }
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
    { threshold: 0.1 }
  )

  elements.forEach((el) => observer.observe(el))
}

onMounted(() => {
  nextTick(() => setupObserver())
})
</script>

<style scoped>
.contact-social-icon {
  display: flex;
  height: 2.25rem;
  width: 2.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(255,255,255,0.06);
  color: var(--c-text-muted);
  transition: all 0.3s;
}
.contact-social-icon:hover {
  border-color: rgba(201,169,98,0.4);
  color: var(--c-gold);
  background: rgba(201,169,98,0.05);
  transform: translateY(-2px);
}
</style>
