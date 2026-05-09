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
// Static page — no logic needed
</script>

<style scoped>
/* ── Page shell ── */
.how-page {
  flex: 1;
  background: var(--color-bg);
}

/* ── Hero ── */
.how-hero {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 4rem 1.5rem 3rem;
  text-align: center;
}

.how-hero__container {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.how-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 1rem;
  background: var(--color-primary-light);
  border: 1px solid #c7d9ff;
  border-radius: var(--radius-pill);
  color: var(--color-primary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.how-hero__badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-primary);
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.8); }
}

.how-hero__title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0;
}

.how-hero__title em {
  font-style: normal;
  color: var(--color-primary);
}

.how-hero__subtitle {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 540px;
  margin: 0;
}

/* ── Steps ── */
.how-steps {
  padding: 4rem 1.5rem;
}

.how-steps__container {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Connector arrow */
.how-step__connector {
  color: #c7d9ff;
  margin: 0.5rem 0;
}

.how-step__connector svg {
  width: 28px;
  height: 28px;
}

/* Single step card */
.how-step {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 1.5rem;
  align-items: start;
  width: 100%;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.how-step:hover {
  border-color: #93b4ff;
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Step number */
.how-step__number {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 900;
  color: #e2e8f0;
  line-height: 1;
  min-width: 48px;
}

/* Step icon */
.how-step__icon {
  width: 48px;
  height: 48px;
  background: var(--color-primary-light);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
}

.how-step__icon svg { width: 24px; height: 24px; }

/* Content */
.how-step__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 0.75rem;
  font-family: var(--font-display);
}

.how-step__text {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  margin: 0 0 1rem;
}

/* Example queries */
.how-step__examples {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.how-step__examples li {
  font-size: 0.82rem;
  color: var(--color-primary);
  background: var(--color-primary-light);
  border: 1px solid #c7d9ff;
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.875rem;
  font-style: italic;
}

/* Technology tags */
.how-step__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.how-step__tag {
  font-size: 0.75rem;
  font-weight: 600;
  background: #f1f5f9;
  color: #475569;
  border-radius: var(--radius-pill);
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--color-border);
}

/* Ranking weights */
.how-step__weights {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.how-weight {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.how-weight__bar {
  height: 8px;
  width: var(--w, 0%);
  background: linear-gradient(90deg, #93b4ff, var(--color-primary));
  border-radius: var(--radius-pill);
  min-width: 4px;
  flex-shrink: 0;
}

.how-weight__label {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  flex: 1;
}

.how-weight__pct {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-primary);
  min-width: 36px;
  text-align: right;
}

/* Feature checklist */
.how-step__features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.how-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.how-feature svg {
  width: 16px;
  height: 16px;
  color: var(--color-success);
  flex-shrink: 0;
}

/* ── Disclaimer ── */
.how-disclaimer {
  background: #fffbeb;
  border-top: 1px solid #fde68a;
  border-bottom: 1px solid #fde68a;
  padding: 1.25rem 1.5rem;
}

.how-disclaimer__container {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.how-disclaimer__container svg {
  width: 20px;
  height: 20px;
  color: #d97706;
  flex-shrink: 0;
  margin-top: 2px;
}

.how-disclaimer__container p {
  font-size: 0.82rem;
  color: #92400e;
  margin: 0;
  line-height: 1.55;
}

/* ── CTA ── */
.how-cta {
  padding: 4rem 1.5rem;
  text-align: center;
}

.how-cta__container {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.how-cta__title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0;
}

.how-cta__text {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin: 0;
}

.how-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(17, 82, 212, 0.28);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.how-cta__btn svg { width: 18px; height: 18px; }

.how-cta__btn:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 22px rgba(17, 82, 212, 0.38);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .how-step {
    grid-template-columns: auto 1fr;
  }

  .how-step__number {
    display: none;
  }

  .how-hero { padding: 2.5rem 1rem 2rem; }
  .how-steps { padding: 2rem 1rem; }
  .how-cta   { padding: 2.5rem 1rem; }
}
</style>