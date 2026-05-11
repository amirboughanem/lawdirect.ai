<template>
  <section class="profile-section">
    <div class="profile-section__header">
      <svg class="profile-section__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
      </svg>
      <h2 class="profile-section__title">Education &amp; Experience</h2>
    </div>
    <div class="profile-section__body">
      <ul class="timeline">
        <li
          v-for="(entry, idx) in timeline"
          :key="idx"
          class="timeline__item"
        >
          <div
            class="timeline__dot"
            :class="{ 'timeline__dot--primary': idx === 0 }"
          ></div>
          <div class="timeline__content">
            <div class="timeline__header">
              <h4 class="timeline__degree">{{ entry.degree }}</h4>
              <span class="timeline__year">{{ entry.year }}</span>
            </div>
            <p class="timeline__school">{{ entry.school }}</p>
            <p class="timeline__desc">{{ entry.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import '@/styles/lawyer/EducationSection.css'

defineProps({
  timeline: {
    type: Array,
    default: () => [],
    // Each entry: { degree, year, school, description }
  },
})
</script>