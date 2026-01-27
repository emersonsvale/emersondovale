<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import CompaniesLogosSection from '../components/CompaniesLogosSection.vue'
import AboutMeSection from '../components/AboutMeSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import TechnologiesLogosSection from '../components/TechnologiesLogosSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import ContactSection from '../components/ContactSection.vue'
import Footer from '../components/Footer.vue'
import NavMenu from '../components/NavMenu.vue'
</script>

<template>
  <div>
    <NavMenu />
    <HeroSection />
    <CompaniesLogosSection />
    <AboutMeSection />
    <ProjectsSection />
    <TechnologiesLogosSection />
    <TestimonialsSection />

    <ContactSection />
    <Footer />
  </div>
</template>
