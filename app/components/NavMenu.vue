<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSmoothScroll } from '../composables/useSmoothScroll'

const { scrollToSection } = useSmoothScroll()

const scrolled = ref(false)
const activeSection = ref('hero-section')

const sections = [
  { id: 'hero-section', label: 'Home' },
  { id: 'about-me', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const handleNavClick = (e: Event, sectionId: string) => {
  e.preventDefault()
  scrollToSection(sectionId, 80)
}

function onScroll() {
  scrolled.value = window.scrollY > 50

  // Detect active section
  const offset = 120
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i].id)
    if (el && el.getBoundingClientRect().top <= offset) {
      activeSection.value = sections[i].id
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav
    id="main-nav"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'nav-scrolled' : 'nav-top'"
    aria-label="Main menu"
  >
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
      <!-- Logo / Name -->
      <a
        href="#hero-section"
        class="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-white transition-opacity hover:opacity-80"
        style="font-family: var(--font-heading)"
        @click="handleNavClick($event, 'hero-section')"
      >
        EV<span class="text-[var(--c-gold)]">.</span>
      </a>

      <!-- Navigation Links -->
      <ul class="flex items-center gap-1 md:gap-2">
        <li v-for="section in sections" :key="section.id">
          <a
            :href="`#${section.id}`"
            class="nav-link relative px-3 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300"
            :class="activeSection === section.id ? 'text-[var(--c-gold)]' : 'text-[var(--c-text-secondary)] hover:text-white'"
            @click="handleNavClick($event, section.id)"
          >
            {{ section.label }}
            <span
              class="absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-[var(--c-gold)] transition-all duration-300"
              :class="activeSection === section.id ? 'w-4' : 'w-0'"
            />
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.nav-top {
  background: transparent;
}

.nav-scrolled {
  background: rgba(6, 6, 6, 0.8);
  backdrop-filter: blur(20px) saturate(1.2);
  -webkit-backdrop-filter: blur(20px) saturate(1.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 1px;
  background: var(--c-gold);
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover::after {
  width: 100%;
}
</style>
