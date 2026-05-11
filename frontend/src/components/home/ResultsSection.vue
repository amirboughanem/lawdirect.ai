<template>
  <section class="results" v-if="hasSearched || lawyers.length > 0">
    <div class="results__container">
      <!-- ── Section header ── -->
      <div class="results__header">
        <div class="results__header-left">
          <h2 class="results__title">
            {{ hasSearched ? 'Top Matches for You' : 'Featured Lawyers' }}
          </h2>
          <p class="results__subtitle" v-if="searchQuery">
            Based on <em>"{{ truncatedQuery }}"</em>
          </p>
          <p class="results__subtitle" v-else>Discover top-rated legal professionals</p>
        </div>

        <div class="results__controls">
          <button class="results__ctrl-btn" @click="filtersOpen = !filtersOpen" type="button">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
            </svg>
            Filters
            <span v-if="activeFilterCount > 0" class="results__filter-badge">
              {{ activeFilterCount }}
            </span>
          </button>

          <div class="results__sort-wrap">
            <select
              class="results__sort"
              v-model="sortBy"
              @change="applySort"
              aria-label="Sort results"
            >
              <option value="recommended">Sort by: Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="experience">Most Experienced</option>
              <option value="rate_asc">Lowest Rate</option>
              <option value="rate_desc">Highest Rate</option>
            </select>
            <svg
              class="results__sort-arrow"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- ── Filter panel ── -->
      <transition name="slide-down">
        <div v-if="filtersOpen" class="results__filters" role="group" aria-label="Filter lawyers">
          <div class="filter-group">
            <label class="filter-label" for="filter-specialty">Specialty</label>
            <select id="filter-specialty" v-model="filters.specialty" class="filter-select">
              <option value="">All Specialties</option>
              <option v-for="s in specialtyOptions" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label" for="filter-location">Location</label>
            <select id="filter-location" v-model="filters.location" class="filter-select">
              <option value="">All Locations</option>
              <option v-for="l in locationOptions" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label" for="filter-rating">Min Rating</label>
            <select id="filter-rating" v-model="filters.minRating" class="filter-select">
              <option :value="0">Any</option>
              <option :value="4">4.0+</option>
              <option :value="4.5">4.5+</option>
              <option :value="4.8">4.8+</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label" for="filter-rate">Max Rate ($/hr)</label>
            <input
              id="filter-rate"
              type="range"
              v-model.number="filters.maxRate"
              min="50"
              max="1000"
              step="25"
              class="filter-range"
            />
            <span class="filter-range-val">${{ filters.maxRate }}</span>
          </div>
          <button class="filter-clear" @click="clearFilters" type="button">Clear All</button>
        </div>
      </transition>

      <!-- ══════════════════════════════════════════
           SKELETON GHOST CARDS — shown while loading
           Each card mirrors the exact structure of LawyerCard
      ══════════════════════════════════════════ -->
      <div v-if="isLoading" class="results__grid" aria-busy="true" aria-label="Loading lawyers">
        <div v-for="n in 6" :key="n" class="skeleton-card">
          <!-- Header row: avatar circle + info lines -->
          <div class="skeleton-card__header">
            <div class="skeleton-card__avatar"></div>
            <div class="skeleton-card__info">
              <div class="skeleton-card__line skeleton-card__line--name"></div>
              <div class="skeleton-card__line skeleton-card__line--specialty"></div>
              <div class="skeleton-card__line skeleton-card__line--rating"></div>
            </div>
          </div>

          <!-- Tags row -->
          <div class="skeleton-card__tags">
            <div class="skeleton-card__tag"></div>
            <div class="skeleton-card__tag skeleton-card__tag--md"></div>
            <div class="skeleton-card__tag skeleton-card__tag--sm"></div>
          </div>

          <!-- Bio lines -->
          <div class="skeleton-card__bio">
            <div class="skeleton-card__line skeleton-card__line--bio-1"></div>
            <div class="skeleton-card__line skeleton-card__line--bio-2"></div>
            <div class="skeleton-card__line skeleton-card__line--bio-3"></div>
          </div>

          <!-- Action buttons row -->
          <div class="skeleton-card__actions">
            <div class="skeleton-card__btn"></div>
            <div class="skeleton-card__btn"></div>
          </div>
        </div>
      </div>

      <!-- ── Empty state ── -->
      <div v-else-if="filteredLawyers.length === 0" class="results__empty">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
        <p>No lawyers match your current filters.</p>
        <button @click="clearFilters" type="button">Clear Filters</button>
      </div>

      <!-- ── Results grid ── -->
      <div v-else class="results__grid">
        <LawyerCard
          v-for="lawyer in visibleLawyers"
          :key="lawyer.id"
          :lawyer="lawyer"
          @view-profile="$emit('view-profile', $event)"
          @contact="$emit('contact', $event)"
        />
      </div>

      <!-- ── Show More button ── -->
      <div class="results__load-more" v-if="!isLoading && filteredLawyers.length > 0">
        <button
          class="results__load-btn"
          @click="loadMore"
          type="button"
          :disabled="visibleCount >= filteredLawyers.length"
          :class="{ 'results__load-btn--disabled': visibleCount >= filteredLawyers.length }"
        >
          <span v-if="visibleCount < filteredLawyers.length">Show More Lawyers</span>
          <span v-else>All {{ filteredLawyers.length }} lawyers shown</span>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import LawyerCard from '@/components/home/LawyerCard.vue'
import '@/styles/home/ResultsSection.css'

const props = defineProps({
  lawyers: { type: Array, default: () => [] },
  searchQuery: { type: String, default: '' },
  hasSearched: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false },
})

defineEmits(['view-profile', 'contact'])

const filtersOpen = ref(false)
const sortBy = ref('recommended')
const visibleCount = ref(6)

const filters = ref({
  specialty: '',
  location: '',
  minRating: 0,
  maxRate: 1000,
})

const truncatedQuery = computed(() =>
  props.searchQuery.length > 60 ? props.searchQuery.slice(0, 60) + '…' : props.searchQuery,
)

const specialtyOptions = computed(() => {
  const set = new Set(props.lawyers.map((l) => l.primarySpecialty).filter(Boolean))
  return [...set]
})

const locationOptions = computed(() => {
  const set = new Set(props.lawyers.map((l) => l.location).filter(Boolean))
  return [...set]
})

const activeFilterCount = computed(
  () =>
    [
      filters.value.specialty,
      filters.value.location,
      filters.value.minRating > 0,
      filters.value.maxRate < 1000,
    ].filter(Boolean).length,
)

const filteredLawyers = computed(() => {
  let list = [...props.lawyers]
  if (filters.value.specialty)
    list = list.filter((l) => l.primarySpecialty === filters.value.specialty)
  if (filters.value.location) list = list.filter((l) => l.location === filters.value.location)
  if (filters.value.minRating > 0) list = list.filter((l) => l.rating >= filters.value.minRating)
  if (filters.value.maxRate < 1000) list = list.filter((l) => l.hourlyRate <= filters.value.maxRate)

  if (sortBy.value === 'rating') list.sort((a, b) => b.rating - a.rating)
  else if (sortBy.value === 'experience') list.sort((a, b) => b.yearsExperience - a.yearsExperience)
  else if (sortBy.value === 'rate_asc') list.sort((a, b) => a.hourlyRate - b.hourlyRate)
  else if (sortBy.value === 'rate_desc') list.sort((a, b) => b.hourlyRate - a.hourlyRate)

  return list
})

const visibleLawyers = computed(() => filteredLawyers.value.slice(0, visibleCount.value))

const loadMore = () => {
  visibleCount.value = Math.min(visibleCount.value + 6, filteredLawyers.value.length + 6)
}
const clearFilters = () => {
  filters.value = { specialty: '', location: '', minRating: 0, maxRate: 1000 }
}
const applySort = () => {
  visibleCount.value = 6
}

watch(
  () => props.searchQuery,
  () => {
    visibleCount.value = 6
  },
)
</script>
