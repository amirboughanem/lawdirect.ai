<template>
  <div class="how-page">

    <!-- Hero -->
    <section class="how-hero">
      <div class="how-hero__container">
        <div class="how-hero__badge">
          <span class="how-hero__badge-dot"></span>
          Simple · Fast · Intelligent
        </div>
        <h1 class="how-hero__title">How LawDirect<em>.ai</em> Works</h1>
        <p class="how-hero__subtitle">
          Finding the right lawyer used to take days of research. Our AI does it in seconds —
          by understanding your case, not just your keywords.
        </p>
      </div>
    </section>

    <!-- Steps -->
    <section class="how-steps">
      <div class="how-steps__container">

        <div class="how-step">
          <div class="how-step__number">01</div>
          <div class="how-step__icon">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div class="how-step__content">
            <h2 class="how-step__title">Describe Your Case</h2>
            <p class="how-step__text">
              Write your legal situation in plain language — no legal jargon needed.
              Mention what happened, where, and what outcome you are looking for.
              The more detail you provide, the better your matches will be.
            </p>
            <ul class="how-step__examples">
              <li>"I was involved in a car accident and need help with insurance claims."</li>
              <li>"My employer terminated me unfairly after 5 years of service."</li>
              <li>"I need to draft a contract for my new business partnership."</li>
            </ul>
          </div>
        </div>

        <div class="how-step__connector" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
          </svg>
        </div>

        <div class="how-step">
          <div class="how-step__number">02</div>
          <div class="how-step__icon">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
            </svg>
          </div>
          <div class="how-step__content">
            <h2 class="how-step__title">AI Analyses Your Situation</h2>
            <p class="how-step__text">
              Our AI model reads your description and extracts the key legal concepts —
              specialisation area, jurisdiction, urgency, and case complexity.
              It then generates a semantic vector that captures the meaning of your case,
              not just the words.
            </p>
            <div class="how-step__tags">
              <span class="how-step__tag">Natural Language Processing</span>
              <span class="how-step__tag">Vector Embeddings</span>
              <span class="how-step__tag">Semantic Search</span>
            </div>
          </div>
        </div>

        <div class="how-step__connector" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
          </svg>
        </div>

        <div class="how-step">
          <div class="how-step__number">03</div>
          <div class="how-step__icon">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4 10v7h3v-7H4zm6.5 0v7h3v-7h-3zM2 22h19v-3H2v3zm15-12v7h3v-7h-3zM11.5 1L2 6v2h19V6l-9.5-5z"/>
            </svg>
          </div>
          <div class="how-step__content">
            <h2 class="how-step__title">Lawyers Are Ranked by Match</h2>
            <p class="how-step__text">
              We compare your case vector against every lawyer profile in our database
              using cosine similarity. Results are then ranked using a weighted formula
              that balances multiple factors to find you the best fit.
            </p>
            <div class="how-step__weights">
              <div class="how-weight">
                <div class="how-weight__bar" style="--w: 50%"></div>
                <span class="how-weight__label">Semantic Match</span>
                <span class="how-weight__pct">50%</span>
              </div>
              <div class="how-weight">
                <div class="how-weight__bar" style="--w: 20%"></div>
                <span class="how-weight__label">Speciality Match</span>
                <span class="how-weight__pct">20%</span>
              </div>
              <div class="how-weight">
                <div class="how-weight__bar" style="--w: 15%"></div>
                <span class="how-weight__label">Experience</span>
                <span class="how-weight__pct">15%</span>
              </div>
              <div class="how-weight">
                <div class="how-weight__bar" style="--w: 10%"></div>
                <span class="how-weight__label">Client Rating</span>
                <span class="how-weight__pct">10%</span>
              </div>
              <div class="how-weight">
                <div class="how-weight__bar" style="--w: 5%"></div>
                <span class="how-weight__label">Location</span>
                <span class="how-weight__pct">5%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="how-step__connector" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
          </svg>
        </div>

        <div class="how-step">
          <div class="how-step__number">04</div>
          <div class="how-step__icon">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div class="how-step__content">
            <h2 class="how-step__title">Review &amp; Contact Your Lawyer</h2>
            <p class="how-step__text">
              Browse your personalised list of recommended lawyers. Each card shows
              their match score, specialities, experience, rating, and hourly rate.
              Click any profile for full details, then contact them directly.
            </p>
            <div class="how-step__features">
              <div class="how-feature">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                No registration required
              </div>
              <div class="how-feature">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Your case description is never stored
              </div>
              <div class="how-feature">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Filter results by location, rate, and rating
              </div>
              <div class="how-feature">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Results in under 3 seconds
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Disclaimer -->
    <section class="how-disclaimer">
      <div class="how-disclaimer__container">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <p>
          LawDirect.ai provides lawyer recommendations only. Results do not constitute legal advice.
          Always verify a lawyer's credentials independently before engaging their services.
        </p>
      </div>
    </section>

    <!-- CTA -->
    <section class="how-cta">
      <div class="how-cta__container">
        <h2 class="how-cta__title">Ready to find your lawyer?</h2>
        <p class="how-cta__text">It takes less than a minute. No account needed.</p>
        <router-link to="/" class="how-cta__btn">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          Find a Lawyer Now
        </router-link>
      </div>
    </section>

  </div>
</template>

<script setup>
import '@/styles/views/HowItWorks.css'
</script>

