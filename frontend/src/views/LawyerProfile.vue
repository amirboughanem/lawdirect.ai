<template>
  <div class="profile-page">

    <!-- ── Loading skeleton ── -->
    <div
      v-if="store.isLoading"
      class="profile-page__loading"
      aria-busy="true"
      aria-label="Loading profile"
    >
      <div class="profile-page__inner">
        <div class="sk-breadcrumb">
          <div class="sk-bc__item"></div>
          <div class="sk-bc__sep"></div>
          <div class="sk-bc__item sk-bc__item--md"></div>
          <div class="sk-bc__sep"></div>
          <div class="sk-bc__item sk-bc__item--lg"></div>
        </div>
        <div class="profile-layout">
          <aside class="sk-sidebar">
            <div class="sk-sidebar__card">
              <div class="sk-sidebar__avatar"></div>
              <div class="sk-sidebar__lines">
                <div class="sk-line sk-line--name"></div>
                <div class="sk-line sk-line--specialty"></div>
                <div class="sk-sidebar__badge"></div>
              </div>
              <div class="sk-sidebar__stats">
                <div class="sk-stat"></div><div class="sk-stat"></div><div class="sk-stat"></div>
              </div>
              <div class="sk-sidebar__buttons">
                <div class="sk-sidebar__btn sk-sidebar__btn--primary"></div>
                <div class="sk-sidebar__btn"></div>
              </div>
            </div>
            <div class="sk-contact-card">
              <div class="sk-line sk-line--label"></div>
              <div v-for="n in 3" :key="n" class="sk-contact-row">
                <div class="sk-contact-icon"></div>
                <div class="sk-contact-lines">
                  <div class="sk-line sk-line--contact-title"></div>
                  <div class="sk-line sk-line--contact-val"></div>
                </div>
              </div>
            </div>
          </aside>
          <div class="profile-main">
            <div v-for="n in 3" :key="n" class="sk-section">
              <div class="sk-section__header">
                <div class="sk-section__icon"></div>
                <div class="sk-line sk-line--section-title"></div>
              </div>
              <div class="sk-section__body">
                <div class="sk-line sk-line--full"></div>
                <div class="sk-line sk-line--w80" style="animation-delay:.05s"></div>
                <div class="sk-line sk-line--w60" style="animation-delay:.1s"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Error / Not found ── -->
    <div v-else-if="store.error || !lawyer" class="profile-page__notfound">
      <div class="notfound__icon">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>
      <h2>Lawyer not found</h2>
      <p>{{ store.error || 'This profile may have been removed or the link is invalid.' }}</p>
      <button class="notfound__btn" @click="$router.push('/')" type="button">Go back home</button>
    </div>

    <!-- ── Profile ── -->
    <div v-else class="profile-page__body">
      <div class="profile-page__inner">

        <!-- Breadcrumb -->
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <router-link to="/" class="breadcrumb__item">Home</router-link>
          <span class="breadcrumb__sep" aria-hidden="true">›</span>
          <router-link to="/" class="breadcrumb__item">Find Lawyers</router-link>
          <span class="breadcrumb__sep" aria-hidden="true">›</span>
          <span class="breadcrumb__item breadcrumb__item--active">{{ lawyer.primarySpecialty }}</span>
          <span class="breadcrumb__sep" aria-hidden="true">›</span>
          <span class="breadcrumb__item breadcrumb__item--current" aria-current="page">{{ lawyer.name }}</span>
        </nav>

        <div class="profile-layout">

          <!-- Sidebar — all props come from normalised lawyer object -->
          <ProfileSideBar
            :name="lawyer.name"
            :specialty="lawyer.primarySpecialty"
            :image="lawyer.image"
            :verified="lawyer.verified"
            :is-online="lawyer.isOnline"
            :hourly-rate="lawyer.hourlyRate"
            :years-experience="lawyer.yearsExperience"
            :rating="lawyer.rating"
            :location="lawyer.location"
            :languages="lawyer.languages"
            :gender="lawyer.gender"
            @book="handleBook"
            @message="handleMessage"
          />

          <!-- Main sections -->
          <div class="profile-main">
            <AboutSection
              :name="lawyer.name"
              :bio="lawyer.bio"
              :specialties="lawyer.specialties"
              :jurisdictions="lawyer.jurisdictions"
              :languages="lawyer.languages"
            />

            <EducationSection :timeline="educationTimeline" />

            <ReviewsSection
              :rating="lawyer.rating"
              :reviews-count="lawyer.reviewsCount"
              :reviews="sampleReviews"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLawyerStore } from '@/stores/lawyerStore'

import ProfileSideBar  from '@/components/lawyer/ProfileSideBar.vue'
import AboutSection    from '@/components/lawyer/AboutSection.vue'
import EducationSection from '@/components/lawyer/EducationSection.vue'
import ReviewsSection  from '@/components/lawyer/ReviewsSection.vue'

import '@/styles/lawyer/ProfileSideBar.css'

const route  = useRoute()
const router = useRouter()
const store  = useLawyerStore()

// lawyer is already normalised (camelCase) by api.js → normalise()
const { currentLawyer: lawyer } = storeToRefs(store)

onMounted(() => store.getLawyerById(route.params.id))
onUnmounted(() => store.clearCurrentLawyer())

// ── Derived data ──────────────────────────────────────────────────────────────

// Build timeline from the single education string the backend returns
// e.g. "LLB – Lebanese American University"
const educationTimeline = computed(() => {
  if (!lawyer.value) return []

  const startYear = new Date().getFullYear() - lawyer.value.yearsExperience
  const entries = []

  if (lawyer.value.education) {
    // education field may contain multiple entries separated by \n or ;
    const lines = lawyer.value.education
      .split(/[\n;]+/)
      .map((l) => l.trim())
      .filter(Boolean)

    lines.forEach((line, i) => {
      entries.push({
        degree:      line.includes('–') ? line.split('–')[0].trim() : 'Law Degree',
        year:        String(startYear + i),
        school:      line.includes('–') ? line.split('–').slice(1).join('–').trim() : line,
        description: '',
      })
    })
  }

  // Always append a "Private Practice" entry
  entries.push({
    degree:      'Private Practice',
    year:        `${startYear} – Present`,
    school:      `Independent Lawyer · ${lawyer.value.location}`,
    description: `${lawyer.value.yearsExperience} years of active practice. ` +
                 `Specialising in ${lawyer.value.primarySpecialty}.`,
  })

  return entries
})

// Generate placeholder reviews from the lawyer's real rating
const sampleReviews = computed(() => {
  if (!lawyer.value) return []
  return [
    {
      id: 1,
      initials: 'KM',
      name: 'Karim M.',
      caseType: lawyer.value.primarySpecialty,
      date: '2 weeks ago',
      rating: 5,
      color: 'linear-gradient(135deg, #4f46e5, #818cf8)',
      text: `${lawyer.value.name} was incredibly professional and achieved the best possible result for my case.`,
    },
    {
      id: 2,
      initials: 'NB',
      name: 'Nour B.',
      caseType: 'Legal Consultation',
      date: '1 month ago',
      rating: Math.round(lawyer.value.rating),
      color: 'linear-gradient(135deg, #0d9488, #34d399)',
      text: 'Very thorough and detail-oriented. Caught several issues I would never have spotted. Highly recommended.',
    },
  ]
})

// ── Actions ───────────────────────────────────────────────────────────────────
const handleBook    = () => { /* wire up booking modal */ }
const handleMessage = () => { /* wire up messaging */ }
</script>