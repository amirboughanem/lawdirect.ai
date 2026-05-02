<template>
  <div class="search-wrapper">
    <!-- Input card -->
    <div class="search-box" :class="{ 'search-box--focused': isFocused }">
      <div class="search-box__glow" aria-hidden="true"></div>

      <div class="search-box__inner">
        <!-- Textarea row -->
        <div class="search-box__input-row">
          <span class="search-box__icon" aria-hidden="true">
            <!--
              Material Icons: auto_awesome
              Source: https://fonts.google.com/icons?icon.query=auto_awesome
              viewBox="0 0 24 24"
            -->
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"
              />
            </svg>
          </span>

          <textarea
            ref="textareaRef"
            v-model="query"
            class="search-box__textarea"
            :placeholder="placeholder"
            :maxlength="1000"
            rows="3"
            @focus="isFocused = true"
            @blur="isFocused = false"
            @input="adjustHeight"
          ></textarea>
        </div>

        <!-- Footer row -->
        <div class="search-box__footer">
          <div class="search-box__tools">
            <button
              class="search-box__tool-btn"
              title="Upload a document"
              type="button"
              aria-label="Attach document"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"
                />
              </svg>
            </button>

            <button
              class="search-box__tool-btn"
              title="Voice input"
              type="button"
              aria-label="Voice input"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
                />
              </svg>
            </button>

            <span
              class="search-box__char-count"
              :class="{ 'search-box__char-count--warn': query.length > 900 }"
              aria-live="polite"
            >
              {{ query.length }}/1000
            </span>
          </div>

          <button
            class="search-box__submit"
            :class="{ 'search-box__submit--active': query.trim().length >= 10 }"
            :disabled="query.trim().length < 10 || isLoading"
            @click="handleSearch"
            type="button"
          >
            <span v-if="!isLoading">
              Find Lawyers
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </span>
            <span v-else class="search-box__spinner" aria-label="Analyzing...">
              <svg viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="rgba(255,255,255,0.3)"
                  stroke-width="2.5"
                  fill="none"
                />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="white"
                  stroke-width="2.5"
                  fill="none"
                  stroke-linecap="round"
                />
              </svg>
              Analyzing...
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Quick-pick suggestions -->
    <div class="search-suggestions" role="group" aria-label="Suggested searches">
      <span class="search-suggestions__label">Try:</span>
      <button
        v-for="suggestion in suggestions"
        :key="suggestion"
        class="search-suggestions__chip"
        @click="useSuggestion(suggestion)"
        type="button"
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import '@/styles/home/SearchBox.css'

const emit = defineEmits(['search'])

const query = ref('')
const isFocused = ref(false)
const isLoading = ref(false)
const textareaRef = ref(null)

const placeholder = `e.g., I was involved in a car accident in Beirut where the other driver ran a red light. I need help with medical bills and insurance claims...`

const suggestions = [
  'Divorce & custody dispute',
  'Contract breach',
  'Car accident injury',
  'Labor dispute',
]

const adjustHeight = () => {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 200) + 'px'
}

const useSuggestion = (text) => {
  query.value = text
  nextTick(adjustHeight)
}

const handleSearch = async () => {
  if (query.value.trim().length < 10 || isLoading.value) return
  isLoading.value = true
  emit('search', query.value.trim())
  // Parent drives loading state; auto-reset as fallback
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}
</script>
