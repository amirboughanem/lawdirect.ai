<template>
  <article
    class="lawyer-card"
    role="button"
    tabindex="0"
    @click="$emit('view-profile', lawyer.id)"
    @keydown.enter="$emit('view-profile', lawyer.id)"
  >
    <!-- ── Header: avatar + info ── -->
    <div class="lawyer-card__header">

      <!-- Avatar with optional online dot -->
      <div class="lawyer-card__avatar-wrap">
        <img
          v-if="lawyer.image"
          :src="lawyer.image"
          :alt="`Photo of ${lawyer.name}`"
          class="lawyer-card__avatar"
          loading="lazy"
        />
        <div v-else class="lawyer-card__avatar-fallback">{{ initials }}</div>
        <!-- Green dot bottom-right when online -->
        <div v-if="lawyer.isOnline" class="lawyer-card__status-dot" aria-hidden="true"></div>
      </div>

      <!-- Name / specialty / rating -->
      <div>
        <div class="lawyer-card__name-row">
          <h3 class="lawyer-card__name">{{ lawyer.name }}</h3>
          <!-- Verified checkmark -->
          <svg
            v-if="lawyer.verified"
            class="lawyer-card__verified"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-label="Verified lawyer"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>

        <p class="lawyer-card__specialty">{{ lawyer.primarySpecialty }}</p>

        <!-- Star + number + count -->
        <div class="lawyer-card__rating">
          <svg class="lawyer-card__star-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          <span class="lawyer-card__rating-val">{{ lawyer.rating.toFixed(1) }}</span>
          <span class="lawyer-card__rating-count">({{ lawyer.reviewsCount }} reviews)</span>
        </div>
      </div>
    </div>

    <!-- ── Meta tags: exp · location · rate ── -->
    <div class="lawyer-card__tags">
      <span class="lawyer-card__tag">{{ lawyer.yearsExperience }} Yrs Exp.</span>
      <span class="lawyer-card__tag">{{ lawyer.location }}</span>
      <span class="lawyer-card__tag">${{ lawyer.hourlyRate }}/hr</span>
    </div>

    <!-- ── AI match bar (only when provided) ── -->
    <div v-if="lawyer.matchScore !== undefined" class="lawyer-card__match">
      <div class="lawyer-card__match-label">
        <span>AI Match</span>
        <span class="lawyer-card__match-pct">{{ Math.round(lawyer.matchScore * 100) }}%</span>
      </div>
      <div
        class="lawyer-card__match-bar"
        role="progressbar"
        :aria-valuenow="Math.round(lawyer.matchScore * 100)"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="lawyer-card__match-fill"
          :style="{ width: `${lawyer.matchScore * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- ── Bio snippet (3 lines max) ── -->
    <p class="lawyer-card__bio">{{ lawyer.bio }}</p>

    <!-- ── Action buttons ── -->
    <div class="lawyer-card__actions">
      <button
        class="lawyer-card__btn lawyer-card__btn--outline"
        @click.stop="$emit('view-profile', lawyer.id)"
        type="button"
      >
        View Profile
      </button>
      <button
        class="lawyer-card__btn lawyer-card__btn--primary"
        @click.stop="$emit('contact', lawyer.id)"
        type="button"
      >
        Contact
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import '@/styles/home/LawyerCard.css'

const props = defineProps({
  lawyer: {
    type: Object,
    required: true,
  },
})

defineEmits(['view-profile', 'contact'])

const initials = computed(() => {
  if (!props.lawyer.name) return '?'
  return props.lawyer.name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
})
</script>