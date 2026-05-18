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

      <div class="lawyer-card__avatar-wrap">
        <!-- Real image from Supabase storage -->
        <img
          v-if="lawyerImage"
          :src="lawyerImage"
          :alt="`Photo of ${lawyer.name}`"
          class="lawyer-card__avatar"
          loading="lazy"
          @error="onImageError"
        />
        <!-- Guest icon fallback — shown when image is null or fails to load -->
        <div v-else class="lawyer-card__avatar-fallback" :aria-label="`${lawyer.name} – no photo`">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>

        <div v-if="lawyer.isOnline" class="lawyer-card__status-dot" aria-hidden="true"></div>
      </div>

      <!-- Name / specialty / rating -->
      <div>
        <div class="lawyer-card__name-row">
          <h3 class="lawyer-card__name">{{ lawyer.name }}</h3>
          <svg
            v-if="lawyer.verified"
            class="lawyer-card__verified"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-label="Verified lawyer"
          >
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
        </div>

        <p class="lawyer-card__specialty">{{ lawyer.primarySpecialty }}</p>

        <div class="lawyer-card__rating">
          <svg class="lawyer-card__star-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          <span class="lawyer-card__rating-val">{{ lawyer.rating.toFixed(1) }}</span>
          <span class="lawyer-card__rating-count">({{ lawyer.reviewsCount }} reviews)</span>
        </div>
      </div>
    </div>

    <!-- ── Tags: exp · location · rate ── -->
    <div class="lawyer-card__tags">
      <span class="lawyer-card__tag">{{ lawyer.yearsExperience }} Yrs Exp.</span>
      <span class="lawyer-card__tag">{{ lawyer.location }}</span>
      <span class="lawyer-card__tag">${{ lawyer.hourlyRate }}/hr</span>
    </div>

    <!-- ── AI match bar (only when similarity_score was returned) ── -->
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

    <!-- ── Bio snippet ── -->
    <p class="lawyer-card__bio">{{ cleanBio }}</p>

    <!-- ── Actions ── -->
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
import { ref, computed } from 'vue'
import '@/styles/home/LawyerCard.css'

const props = defineProps({
  lawyer: { type: Object, required: true },
})

defineEmits(['view-profile', 'contact'])

// If the Supabase image URL 404s (e.g. file not uploaded yet),
// clear it so the guest icon fallback renders instead
const imgFailed = ref(false)
const onImageError = () => { imgFailed.value = true }

const lawyerImage = computed(() => imgFailed.value ? null : props.lawyer.image)

const cleanBio = computed(() => {
  const bio = props.lawyer.bio ?? ''
  // Take only the first line (the human-readable intro)
  const firstLine = bio.split('\n')[0]?.trim()
  return firstLine || bio
})
</script>