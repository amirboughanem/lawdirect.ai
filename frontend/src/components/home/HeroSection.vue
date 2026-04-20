<template>
  <section class="hero">
    <!-- Ambient background blobs -->
    <div class="hero__bg" aria-hidden="true">
      <div class="hero__blob hero__blob--1"></div>
      <div class="hero__blob hero__blob--2"></div>
    </div>

    <div class="hero__container">

      <!-- Animated badge -->
      <div class="hero__badge">
        <span class="hero__badge-dot"></span>
        AI-Powered Legal Matching
      </div>

      <!-- Headline -->
      <h1 class="hero__title">
        Find the
        <span class="hero__title-highlight">
          Right Lawyer
          <svg
            class="hero__title-underline"
            viewBox="0 0 220 12"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M2 8 Q 110 2 218 8" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
          </svg>
        </span>
        for Your Case
      </h1>

      <!-- Subtitle -->
      <p class="hero__subtitle">
        Describe your legal situation in plain language. Our AI analyzes thousands of
        top-rated attorneys to find your perfect match instantly.
      </p>

      <!-- Search box injected from parent (Home.vue) -->
      <slot name="search" />

      <!-- Trust strip -->
      <div class="hero__trust">
        <div class="hero__trust-item">
          <svg class="hero__trust-icon hero__trust-icon--green" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z" fill="currentColor" opacity=".2"/>
            <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Private &amp; Encrypted</span>
        </div>

        <div class="hero__trust-divider" aria-hidden="true"></div>

        <div class="hero__trust-item">
          <svg class="hero__trust-icon hero__trust-icon--blue" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          <span>15,000+ Active Lawyers</span>
        </div>

        <div class="hero__trust-divider" aria-hidden="true"></div>

        <div class="hero__trust-item">
          <svg class="hero__trust-icon hero__trust-icon--amber" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          <span>4.9/5 Avg Rating</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import '@/styles/home/HeroSection.css'
// No props — search box is injected via the named slot from Home.vue
</script>