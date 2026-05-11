<template>
  <div class="about-page">

    <!-- ── Hero ── -->
    <section class="about-hero">
      <div class="about-hero__container">
        <span class="about-hero__badge">
          <span class="about-hero__badge-dot"></span>
          Our Story
        </span>
        <h1 class="about-hero__title">
          Built for People Who Need <em>Real Legal Help</em>
        </h1>
        <p class="about-hero__subtitle">
          LawDirect.ai was founded in Lebanon to bridge the gap between people
          facing legal challenges and the right lawyer for them — powered by AI,
          driven by trust.
        </p>
      </div>
    </section>

    <!-- ── Stats bar ── -->
    <section class="about-stats">
      <div class="about-stats__container">
        <div class="about-stat" v-for="stat in stats" :key="stat.label">
          <span class="about-stat__val" v-html="stat.val"></span>
          <span class="about-stat__lbl">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- ── Mission & Story ── -->
    <section class="about-mission">
      <div class="about-mission__container">
        <div class="about-mission__content">
          <p class="about-mission__label">Why We Built This</p>
          <h2 class="about-mission__title">
            Legal help shouldn't be a <em>privilege</em>
          </h2>
          <p class="about-mission__text">
            In Lebanon, finding the right lawyer often means relying on word of mouth,
            wasting time on wrong consultations, or simply giving up. We saw this problem
            firsthand and knew technology could fix it.
          </p>
          <p class="about-mission__text">
            LawDirect.ai uses AI to understand your case, match you with the most
            relevant lawyer in seconds, and give you the confidence to take the next step —
            no matter your background or budget.
          </p>
        </div>

        <div class="about-mission__quote">
          <p class="about-mission__quote-text">
            Everyone deserves access to justice. We built LawDirect.ai so that
            finding the right lawyer is as simple as describing your problem.
          </p>
          <div class="about-mission__quote-author">
            <span class="about-mission__quote-dot"></span>
            <p class="about-mission__quote-name">Anas & Amir — Co-Founders, LawDirect.ai</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Values ── -->
    <section class="about-values">
      <div class="about-values__container">
        <div class="about-values__heading">
          <p class="about-values__label">What We Stand For</p>
          <h2 class="about-values__title">Our Core Values</h2>
        </div>
        <div class="about-values__grid">
          <div class="about-value" v-for="value in values" :key="value.title">
            <div class="about-value__icon" v-html="value.icon"></div>
            <h3 class="about-value__title">{{ value.title }}</h3>
            <p class="about-value__text">{{ value.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Team ── -->
    <section class="about-team">
      <div class="about-team__container">
        <div class="about-team__heading">
          <p class="about-team__label">The People Behind It</p>
          <h2 class="about-team__title">Meet the Founders</h2>
        </div>
        <div class="about-team__grid">
          <div class="about-member" v-for="member in team" :key="member.name">
            <div class="about-member__avatar-wrap">
              <img
                v-if="member.photo"
                :src="member.photo"
                :alt="member.name"
                class="about-member__avatar"
              />
              <!-- Fallback until photos are added -->
              <div v-else class="about-member__avatar avatar--fallback" style="width:100px;height:100px;font-size:1.5rem;">
                {{ member.initials }}
              </div>
            </div>
            <h3 class="about-member__name">{{ member.name }}</h3>
            <span class="about-member__role">{{ member.role }}</span>
            <p class="about-member__bio">{{ member.bio }}</p>
            <a
              :href="member.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="about-member__linkedin"
            >
              <!-- LinkedIn icon -->
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="about-cta">
      <div class="about-cta__container">
        <h2 class="about-cta__title">Ready to find your lawyer?</h2>
        <p class="about-cta__text">
          Describe your case and let LawDirect.ai match you with the right legal expert in seconds.
        </p>
        <RouterLink to="/" class="about-cta__btn">
          Get Started
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
        </RouterLink>
      </div>
    </section>

  </div>
</template>

<script setup>
import '@/styles/views/AboutLawdirect.css'
import AnasPhoto from '@/assets/team/anas.png'
import AmirPhoto from '@/assets/team/amir.png'

const stats = [
  { val: '500<em>+</em>', label: 'Lawyers Registered' },
  { val: '1,200<em>+</em>', label: 'Cases Matched' },
  { val: '4.9<em>★</em>', label: 'Average Rating' },
  { val: '1', label: 'Countries Served' },
]

const values = [
  {
    title: 'Transparency',
    text: 'No hidden fees, no surprises. We show you exactly who you are matched with and why.',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`,
  },
  {
    title: 'Accessibility',
    text: 'Legal help for everyone — regardless of background, location, or budget.',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
  },
  {
    title: 'Trust',
    text: 'Every lawyer on our platform is verified. Your case details stay private and secure.',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>`,
  },
]

const team = [
  {
    name: 'Anas Mardoud',
    role: 'Co-Founder & Frontend Developer',
    bio: 'Computer Science student passionate about building technology that solves real-world problems in the MENA region.',
    photo: AnasPhoto,
    initials: 'AM',
    linkedin: 'https://www.linkedin.com/in/anas-mardoud-47996222a/',
  },
  {
    name: 'Amir Bou Ghanem',
    role: 'Co-Founder & Backend Developer',
    bio: 'Backend engineer at Oreyeon, AWS certified, GDG Coast Lebanon organizer. Builds swift and scalable pipelines.',
    photo: AmirPhoto,
    initials: 'AB',
    linkedin: 'https://www.linkedin.com/in/amir-bou-ghanem/',
  },
]
</script>