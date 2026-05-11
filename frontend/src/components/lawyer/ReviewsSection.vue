<template>
  <section class="profile-section">
    <div class="profile-section__header">
      <svg class="profile-section__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
      </svg>
      <h2 class="profile-section__title">Client Reviews</h2>
      <a href="#" class="profile-section__view-all">View all {{ reviewsCount }} reviews</a>
    </div>

    <div class="profile-section__body">

      <!-- Rating overview -->
      <div class="reviews-overview">
        <div class="reviews-overview__score">
          <span class="reviews-overview__big">{{ rating.toFixed(1) }}</span>
          <div
            class="reviews-overview__stars"
            :style="{ '--fill': `${(rating / 5) * 100}%` }"
            :aria-label="`${rating} out of 5 stars`"
          >
            <span class="stars-empty">★★★★★</span>
            <span class="stars-filled" aria-hidden="true">★★★★★</span>
          </div>
          <p class="reviews-overview__based">Based on {{ reviewsCount }} reviews</p>
        </div>

        <div class="reviews-overview__bars">
          <div v-for="bar in ratingBars" :key="bar.star" class="rating-bar">
            <span class="rating-bar__star">{{ bar.star }}</span>
            <div class="rating-bar__track" role="progressbar" :aria-valuenow="bar.pct" aria-valuemin="0" aria-valuemax="100">
              <div class="rating-bar__fill" :style="{ width: bar.pct + '%' }"></div>
            </div>
            <span class="rating-bar__pct">{{ bar.pct }}%</span>
          </div>
        </div>
      </div>

      <!-- Individual reviews -->
      <div class="review-cards">
        <article v-for="review in reviews" :key="review.id" class="review-card">
          <div class="review-card__header">
            <div class="review-card__avatar" :style="{ background: review.color }">
              {{ review.initials }}
            </div>
            <div class="review-card__meta">
              <p class="review-card__name">{{ review.name }}</p>
              <p class="review-card__case">{{ review.caseType }}</p>
            </div>
            <span class="review-card__date">{{ review.date }}</span>
          </div>

          <div class="review-card__stars" :aria-label="`${review.rating} out of 5 stars`">
            <span
              v-for="i in 5"
              :key="i"
              class="review-card__star"
              :class="{ 'review-card__star--filled': i <= review.rating }"
              aria-hidden="true"
            >★</span>
          </div>

          <p class="review-card__text">"{{ review.text }}"</p>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import '@/styles/lawyer/ReviewsSection.css'

const props = defineProps({
  rating:       { type: Number, required: true },
  reviewsCount: { type: Number, default: 0 },
  reviews:      { type: Array,  default: () => [] },
  // Each review: { id, initials, name, caseType, date, rating, color, text }
})

const ratingBars = computed(() => {
  const five = Math.round((props.rating - 4) * 80 + 60)
  const four  = Math.max(100 - five - 5, 3)
  return [
    { star: 5, pct: five },
    { star: 4, pct: four },
    { star: 3, pct: 3 },
    { star: 2, pct: 0 },
    { star: 1, pct: 0 },
  ]
})
</script>