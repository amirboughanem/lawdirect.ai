<template>
  <!-- About -->
  <section class="profile-section">
    <div class="profile-section__header">
      <svg class="profile-section__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
      <h2 class="profile-section__title">About {{ firstName }}</h2>
    </div>
    <div class="profile-section__body">
      <p class="profile-section__bio">{{ bio }}</p>
    </div>
  </section>

  <!-- Specialization & Courts -->
  <section class="profile-section">
    <div class="profile-section__header">
      <svg class="profile-section__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4 10v7h3v-7H4zm6.5 0v7h3v-7h-3zM2 22h19v-3H2v3zm15-12v7h3v-7h-3zM11.5 1L2 6v2h19V6l-9.5-5z"/>
      </svg>
      <h2 class="profile-section__title">Specialization &amp; Courts</h2>
    </div>
    <div class="profile-section__body">

      <h3 class="profile-section__sub">Practice Areas</h3>
      <div class="specialty-badges">
        <span v-for="s in specialties" :key="s" class="specialty-badge">{{ s }}</span>
      </div>

      <div class="courts-grid">
        <div>
          <h3 class="profile-section__sub">Court Jurisdictions</h3>
          <ul class="courts-list">
            <li v-for="j in jurisdictions" :key="j">
              <span class="courts-list__dot"></span>{{ j }}
            </li>
          </ul>
        </div>
        <div>
          <h3 class="profile-section__sub">Languages of Practice</h3>
          <ul class="courts-list">
            <li v-for="l in languages" :key="l">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="width:15px;height:15px;color:#94a3b8;flex-shrink:0">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              {{ l }}
            </li>
          </ul>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import '@/styles/lawyer/AboutSection.css'
import '@/styles/lawyer/EducationSection.css'

const props = defineProps({
  name:          { type: String, required: true },
  bio:           { type: String, default: '' },
  specialties:   { type: Array,  default: () => [] },
  jurisdictions: { type: Array,  default: () => [] },
  languages:     { type: Array,  default: () => [] },
})

const firstName = computed(() => props.name.split(' ')[0])
</script>