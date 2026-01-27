<script setup lang="ts">
import { useSmoothScroll } from '../composables/useSmoothScroll'

const { scrollToSection } = useSmoothScroll()

const handleNavClick = (e: Event, sectionId: string) => {
  e.preventDefault()
  scrollToSection(sectionId, 80)
}
</script>

<template>
  <nav
    id="main-nav"
    class="fixed top-0 left-0 right-0 z-50 shrink-0 bg-[#0a0a0a]/0 backdrop-blur-sm"
    aria-label="Main menu"
  >
    <div class="mx-auto flex w-full max-w-6xl justify-center px-6 py-4 md:justify-start">
      <ul class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-400">
        <li>
          <a
            href="#hero-section"
            class="transition hover:text-[#c9a962]"
            @click="handleNavClick($event, 'hero-section')"
          >
            Home
          </a>
        </li>
        <li><span class="text-neutral-600" aria-hidden="true">•</span></li>
        <li>
          <a
            href="#about-me"
            class="transition hover:text-[#c9a962]"
            @click="handleNavClick($event, 'about-me')"
          >
            About
          </a>
        </li>
        <li><span class="text-neutral-600" aria-hidden="true">•</span></li>
        <li>
          <a
            href="#projects"
            class="transition hover:text-[#c9a962]"
            @click="handleNavClick($event, 'projects')"
          >
            Projects
          </a>
        </li>
        <li><span class="text-neutral-600" aria-hidden="true">•</span></li>
        <li>
          <a
            href="#contact"
            class="transition hover:text-[#c9a962]"
            @click="handleNavClick($event, 'contact')"
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
