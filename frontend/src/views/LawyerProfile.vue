<template>
  <div class="profile-page">
    <div
      v-if="isLoading"
      class="profile-page__loading"
      aria-busy="true"
      aria-label="Loading profile"
    >
      <div class="profile-page__inner">
        <!-- Skeleton breadcrumb -->
        <div class="sk-breadcrumb">
          <div class="sk-bc__item"></div>
          <div class="sk-bc__sep"></div>
          <div class="sk-bc__item sk-bc__item--md"></div>
          <div class="sk-bc__sep"></div>
          <div class="sk-bc__item sk-bc__item--lg"></div>
        </div>

        <div class="profile-layout">
          <!-- ── Skeleton sidebar ── -->
          <aside class="sk-sidebar">
            <!-- Profile card ghost -->
            <div class="sk-sidebar__card">
              <div class="sk-sidebar__avatar"></div>
              <div class="sk-sidebar__lines">
                <div class="sk-line sk-line--name"></div>
                <div class="sk-line sk-line--specialty"></div>
                <div class="sk-sidebar__badge"></div>
              </div>
              <div class="sk-sidebar__stats">
                <div class="sk-stat"></div>
                <div class="sk-stat"></div>
                <div class="sk-stat"></div>
              </div>
              <div class="sk-sidebar__buttons">
                <div class="sk-sidebar__btn sk-sidebar__btn--primary"></div>
                <div class="sk-sidebar__btn"></div>
              </div>
            </div>

            <!-- Contact card ghost -->
            <div class="sk-contact-card">
              <div class="sk-line sk-line--label"></div>
              <div class="sk-contact-row">
                <div class="sk-contact-icon"></div>
                <div class="sk-contact-lines">
                  <div class="sk-line sk-line--contact-title"></div>
                  <div class="sk-line sk-line--contact-val"></div>
                </div>
              </div>
              <div class="sk-contact-row">
                <div class="sk-contact-icon"></div>
                <div class="sk-contact-lines">
                  <div class="sk-line sk-line--contact-title"></div>
                  <div class="sk-line sk-line--contact-val"></div>
                </div>
              </div>
              <div class="sk-contact-row">
                <div class="sk-contact-icon"></div>
                <div class="sk-contact-lines">
                  <div class="sk-line sk-line--contact-title"></div>
                  <div class="sk-line sk-line--contact-val"></div>
                </div>
              </div>
            </div>
          </aside>

          <!-- ── Skeleton main sections ── -->
          <div class="profile-main">
            <!-- About section ghost -->
            <div class="sk-section">
              <div class="sk-section__header">
                <div class="sk-section__icon"></div>
                <div class="sk-line sk-line--section-title"></div>
              </div>
              <div class="sk-section__body">
                <div class="sk-line sk-line--full"></div>
                <div class="sk-line sk-line--full" style="animation-delay: 0.05s"></div>
                <div class="sk-line sk-line--w80" style="animation-delay: 0.1s"></div>
                <div class="sk-line sk-line--full" style="animation-delay: 0.05s"></div>
                <div class="sk-line sk-line--w60" style="animation-delay: 0.1s"></div>
              </div>
            </div>

            <!-- Specialization section ghost -->
            <div class="sk-section">
              <div class="sk-section__header">
                <div class="sk-section__icon"></div>
                <div class="sk-line sk-line--section-title"></div>
              </div>
              <div class="sk-section__body">
                <div class="sk-line sk-line--label" style="margin-bottom: 0.75rem"></div>
                <div class="sk-badges">
                  <div class="sk-badge"></div>
                  <div class="sk-badge sk-badge--md"></div>
                  <div class="sk-badge sk-badge--lg"></div>
                  <div class="sk-badge"></div>
                  <div class="sk-badge sk-badge--md"></div>
                </div>
                <div class="sk-courts-grid">
                  <div>
                    <div class="sk-line sk-line--label" style="margin-bottom: 0.65rem"></div>
                    <div class="sk-line sk-line--court" style="animation-delay: 0.05s"></div>
                    <div class="sk-line sk-line--court" style="animation-delay: 0.1s"></div>
                    <div class="sk-line sk-line--court" style="animation-delay: 0.15s"></div>
                  </div>
                  <div>
                    <div class="sk-line sk-line--label" style="margin-bottom: 0.65rem"></div>
                    <div class="sk-line sk-line--court" style="animation-delay: 0.05s"></div>
                    <div class="sk-line sk-line--court" style="animation-delay: 0.1s"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Education section ghost -->
            <div class="sk-section">
              <div class="sk-section__header">
                <div class="sk-section__icon"></div>
                <div class="sk-line sk-line--section-title"></div>
              </div>
              <div class="sk-section__body">
                <div class="sk-timeline">
                  <div class="sk-tl__item" v-for="n in 2" :key="n">
                    <div class="sk-tl__dot"></div>
                    <div class="sk-tl__content">
                      <div class="sk-tl__header">
                        <div class="sk-line sk-line--tl-degree"></div>
                        <div class="sk-line sk-line--tl-year"></div>
                      </div>
                      <div class="sk-line sk-line--tl-school" style="margin: 0.3rem 0"></div>
                      <div class="sk-line sk-line--w80"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /profile-main -->
        </div>
      </div>
    </div>

    <!-- ── Not found ── -->
    <div v-else-if="!lawyer" class="profile-page__notfound">
      <div class="notfound__icon">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </svg>
      </div>
      <h2>Lawyer not found</h2>
      <p>This profile may have been removed or the link is invalid.</p>
      <button class="notfound__btn" @click="$router.push('/')" type="button">Go back home</button>
    </div>

    <!-- ── Main content ── -->
    <div v-else class="profile-page__body">
      <div class="profile-page__inner">
        <!-- Breadcrumb -->
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <router-link to="/" class="breadcrumb__item">Home</router-link>
          <span class="breadcrumb__sep" aria-hidden="true">›</span>
          <router-link to="/" class="breadcrumb__item">Find Lawyers</router-link>
          <span class="breadcrumb__sep" aria-hidden="true">›</span>
          <span class="breadcrumb__item breadcrumb__item--active">{{
            lawyer.primarySpecialty
          }}</span>
          <span class="breadcrumb__sep" aria-hidden="true">›</span>
          <span class="breadcrumb__item breadcrumb__item--current" aria-current="page">{{
            lawyer.name
          }}</span>
        </nav>

        <div class="profile-layout">
          <!-- Sidebar -->
          <ProfileSideBar
            :name="lawyer.name"
            :primary-specialty="lawyer.primarySpecialty"
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
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLawyerStore } from '@/stores/lawyerStore'

import ProfileSideBar from '@/components/lawyer/ProfileSideBar.vue'
import AboutSection from '@/components/lawyer/AboutSection.vue'
import EducationSection from '@/components/lawyer/EducationSection.vue'
import ReviewsSection from '@/components/lawyer/ReviewsSection.vue'

import '@/styles/lawyer/ProfileSideBar.css'

const route = useRoute()
const store = useLawyerStore()
const { currentLawyer: lawyer, isLoading } = storeToRefs(store)

onMounted(() => store.getLawyerById(route.params.id))

const educationTimeline = computed(() => {
  if (!lawyer.value) return []
  const startYear = new Date().getFullYear() - lawyer.value.yearsExperience
  return [
    {
      degree: 'Law Degree',
      year: String(startYear),
      school: lawyer.value.education || 'Lebanese University – Faculty of Law',
      description: `Graduated and began legal practice specializing in ${lawyer.value.primarySpecialty}.`,
    },
    {
      degree: 'Private Practice',
      year: `${startYear} – Present`,
      school: `Independent Lawyer · ${lawyer.value.location}`,
      description: `${lawyer.value.yearsExperience} years of active practice. Specializes in ${lawyer.value.primarySpecialty}.`,
    },
  ]
})

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
      text: `${lawyer.value.name} was incredibly professional. Explained everything clearly and achieved the best possible result for my case.`,
    },
    {
      id: 2,
      initials: 'NB',
      name: 'Nour B.',
      caseType: 'Legal Consultation',
      date: '1 month ago',
      rating: 5,
      color: 'linear-gradient(135deg, #0d9488, #34d399)',
      text: 'Very thorough and detail-oriented. Caught several issues I would never have spotted. A true expert — highly recommended.',
    },
  ]
})

const handleBook = () => {}
const handleMessage = () => {}
</script>
