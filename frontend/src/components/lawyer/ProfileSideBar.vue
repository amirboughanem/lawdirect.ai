<template>
  <aside class="profile-sidebar">

    <!-- Main profile card -->
    <div class="sidebar-card">

      <!-- Avatar -->
      <div class="sidebar-card__avatar-wrap">
        <img
          v-if="image"
          :src="image"
          :alt="`Photo of ${name}`"
          class="sidebar-card__avatar"
        />
        <div v-else class="sidebar-card__avatar sidebar-card__avatar--fallback">
          {{ initials }}
        </div>
        <div v-if="isOnline" class="sidebar-card__online-dot" title="Online Now"></div>
      </div>

      <!-- Identity -->
      <div class="sidebar-card__identity">
        <div class="sidebar-card__name-row">
          <h1 class="sidebar-card__name">{{ name }}</h1>
          <svg
            v-if="verified"
            class="sidebar-card__verified-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-label="Verified lawyer"
          >
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
        </div>
        <p class="sidebar-card__specialty">{{ primarySpecialty }}</p>
        <div v-if="isOnline" class="sidebar-card__available-badge">
          <span class="sidebar-card__available-dot"></span>
          Available Now
        </div>
      </div>

      <!-- Stats grid -->
      <div class="sidebar-card__stats-grid">
        <div class="stat-cell">
          <span class="stat-cell__val">${{ hourlyRate }}</span>
          <span class="stat-cell__lbl">Hourly</span>
        </div>
        <div class="stat-cell">
          <span class="stat-cell__val">{{ yearsExperience }}yr</span>
          <span class="stat-cell__lbl">Exp.</span>
        </div>
        <div class="stat-cell">
          <span class="stat-cell__val stat-cell__val--stars">
            {{ rating.toFixed(1) }}
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </span>
          <span class="stat-cell__lbl">Rating</span>
        </div>
      </div>

      <!-- CTA buttons -->
      <div class="sidebar-card__actions">
        <button class="sidebar-card__btn sidebar-card__btn--primary" type="button" @click="$emit('book')">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
          </svg>
          Book Consultation
        </button>
        <button class="sidebar-card__btn sidebar-card__btn--outline" type="button" @click="$emit('message')">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
          Send Message
        </button>
      </div>
    </div>

    <!-- Contact info card -->
    <div class="contact-card">
      <h3 class="contact-card__title">Contact Info</h3>
      <ul class="contact-card__list">

        <li class="contact-card__item">
          <div class="contact-card__icon-wrap">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div>
            <p class="contact-card__label">Location</p>
            <p class="contact-card__value">{{ location }}</p>
          </div>
        </li>

        <li class="contact-card__item">
          <div class="contact-card__icon-wrap">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div>
            <p class="contact-card__label">Languages</p>
            <p class="contact-card__value">{{ languages?.join(', ') }}</p>
          </div>
        </li>

        <li v-if="gender" class="contact-card__item">
          <div class="contact-card__icon-wrap">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div>
            <p class="contact-card__label">Gender</p>
            <p class="contact-card__value">{{ gender }}</p>
          </div>
        </li>

      </ul>
    </div>

  </aside>
</template>

<script setup>
import { computed } from 'vue'
import '@/styles/lawyer/ProfileSideBar.css'

const props = defineProps({
  name:            { type: String,  required: true },
  primarySpecialty:{ type: String,  default: '' },
  image:           { type: String,  default: null },
  verified:        { type: Boolean, default: false },
  isOnline:        { type: Boolean, default: false },
  hourlyRate:      { type: Number,  default: 0 },
  yearsExperience: { type: Number,  default: 0 },
  rating:          { type: Number,  default: 0 },
  location:        { type: String,  default: '' },
  languages:       { type: Array,   default: () => [] },
  gender:          { type: String,  default: null },
})

defineEmits(['book', 'message'])

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
})
</script>