<template>
  <nav class="navbar">
    <div class="navbar__container">

      <!-- Logo -->
      <router-link to="/" class="navbar__brand">
        <div class="navbar__logo-icon">
          <span class="material-symbols-outlined navbar__logo-gavel" aria-hidden="true">gavel</span>
        </div>
        <span class="navbar__brand-text">LawDirect<em>.ai</em></span>
      </router-link>

      <!-- Desktop links -->
      <ul class="navbar__links">
        <li><router-link to="/how-it-works" class="navbar__link">How it Works</router-link></li>
        <li><router-link to="/about"        class="navbar__link">About Us</router-link></li>
        <li><router-link to="/"             class="navbar__link">Find a Lawyer</router-link></li>
      </ul>

      <!-- Hamburger (mobile) -->
      <button
        class="navbar__hamburger"
        :class="{ 'is-open': menuOpen }"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
        type="button"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile dropdown -->
    <transition name="mobile-menu">
      <div v-if="menuOpen" class="navbar__mobile">
        <router-link to="/how-it-works" class="navbar__mobile-link" @click="menuOpen = false">How it Works</router-link>
        <router-link to="/about"        class="navbar__mobile-link" @click="menuOpen = false">About Us</router-link>
        <router-link to="/"             class="navbar__mobile-link" @click="menuOpen = false">Find a Lawyer</router-link>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import '@/styles/layout/NavBar.css'

const menuOpen = ref(false)
</script>