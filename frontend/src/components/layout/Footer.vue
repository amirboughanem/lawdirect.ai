<template>
  <footer class="footer">
    <div class="footer__container">

      <!-- Brand -->
      <div class="footer__brand">
        <div class="footer__logo">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 17H7.5a2.5 2.5 0 0 1 0-5H11V9H7.5a4.5 4.5 0 0 0 0 9H11v-1zm2 1h3.5a4.5 4.5 0 0 0 0-9H13v2h3.5a2.5 2.5 0 0 1 0 5H13v2z"/>
          </svg>
        </div>
        <span class="footer__brand-name">LawDirect<em>.ai</em></span>
      </div>

      <!-- Links -->
      <nav class="footer__links" aria-label="Footer navigation">
        <a href="#" class="footer__link">Privacy Policy</a>
        <a href="#" class="footer__link">Terms of Service</a>
        <a href="#" class="footer__link">Support</a>
        <a href="#" class="footer__link">For Lawyers</a>
      </nav>

      <!-- Disclaimer -->
      <p class="footer__disclaimer">
        This AI-powered matching system provides recommendations only and does not constitute legal advice.
      </p>

      <!-- Copyright -->
      <p class="footer__copy">© {{ currentYear }} LawDirect.ai. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import '@/styles/layout/Footer.css'

const currentYear = new Date().getFullYear()
</script>