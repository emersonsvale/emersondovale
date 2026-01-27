<template>
  <footer
    id="main-footer"
    class="relative border-t border-neutral-800/60 bg-[#0a0a0a] py-12"
    aria-label="Footer"
  >
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid gap-8 md:grid-cols-3">
        <!-- Sobre -->
        <div>
          <h3 class="text-lg font-semibold uppercase tracking-wide text-[#c9a962]">
            {{ aboutTitle }}
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-neutral-400">
            {{ aboutText }}
          </p>
        </div>

        <!-- Links rápidos -->
        <div>
          <h3 class="text-lg font-semibold uppercase tracking-wide text-[#c9a962]">
            Quick Links
          </h3>
          <nav class="mt-3 space-y-2">
            <a
              href="#about-me"
              class="block text-sm text-neutral-400 transition hover:text-[#c9a962]"
              @click="handleNavClick($event, 'about-me')"
            >
              About Me
            </a>
            <a
              href="#projects"
              class="block text-sm text-neutral-400 transition hover:text-[#c9a962]"
              @click="handleNavClick($event, 'projects')"
            >
              Projects
            </a>
            <a
              href="#contact"
              class="block text-sm text-neutral-400 transition hover:text-[#c9a962]"
              @click="handleNavClick($event, 'contact')"
            >
              Contact
            </a>
          </nav>
        </div>

        <!-- Redes sociais -->
        <div>
          <h3 class="text-lg font-semibold uppercase tracking-wide text-[#c9a962]">
            Connect
          </h3>
          <div class="mt-3 flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/emersonsvale/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a962]/30 bg-[#c9a962]/5 text-[#c9a962] transition hover:border-[#c9a962] hover:bg-[#c9a962]/10"
              aria-label="LinkedIn"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://github.com/emersonsvale"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a962]/30 bg-[#c9a962]/5 text-[#c9a962] transition hover:border-[#c9a962] hover:bg-[#c9a962]/10"
              aria-label="GitHub"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-1.003-.013-1.97-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/emersonsvale/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a962]/30 bg-[#c9a962]/5 text-[#c9a962] transition hover:border-[#c9a962] hover:bg-[#c9a962]/10"
              aria-label="Instagram"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 border-t border-neutral-800/60 pt-8 text-center">
        <p class="text-sm text-neutral-500">
          © {{ currentYear }} {{ copyrightName }}. All rights reserved.
        </p>
        <p class="mt-2 text-xs text-neutral-600">
          Developed with dedication and attention to detail.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSmoothScroll } from '../composables/useSmoothScroll'

const props = withDefaults(
  defineProps<{
    aboutTitle?: string
    aboutText?: string
    copyrightName?: string
  }>(),
  {
    aboutTitle: 'Emerson Vale',
    aboutText: 'Senior developer focused on building solid, scalable and easy-to-maintain digital products.',
    copyrightName: 'Emerson Vale',
  }
)

const { scrollToSection } = useSmoothScroll()
const currentYear = computed(() => new Date().getFullYear())

const handleNavClick = (e: Event, sectionId: string) => {
  e.preventDefault()
  scrollToSection(sectionId, 80)
}
</script>
