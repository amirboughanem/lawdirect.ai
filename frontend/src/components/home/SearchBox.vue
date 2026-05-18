<template>
  <div class="search-wrapper">
    <div class="search-box" :class="{ 'search-box--focused': isFocused }">
      <div class="search-box__glow" aria-hidden="true"></div>

      <div class="search-box__inner">
        <div class="search-box__input-row">
          <span class="search-box__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
            </svg>
          </span>

          <textarea
            ref="textareaRef"
            v-model="query"
            class="search-box__textarea"
            :placeholder="placeholder"
            :maxlength="1000"
            rows="3"
            :disabled="isLoading"
            @focus="isFocused = true"
            @blur="handleBlur"
            @input="adjustHeight"
          ></textarea>
        </div>

        <div class="search-box__footer">
          <div class="search-box__tools">
            <button class="search-box__tool-btn" title="Upload a document" type="button" aria-label="Attach document">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
              </svg>
            </button>
            <button class="search-box__tool-btn" title="Voice input" type="button" aria-label="Voice input">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </button>
            <span
              class="search-box__char-count"
              :class="{ 'search-box__char-count--warn': query.trim().length > 900 }"
              aria-live="polite"
            >
              {{ query.trim().length }}/1000
            </span>
          </div>

          <button
            class="search-box__submit"
            :class="{ 'search-box__submit--active': canSubmit }"
            :disabled="!canSubmit || isLoading"
            @click="handleSearch"
            type="button"
          >
            <span v-if="isLoading" class="search-box__spinner" aria-label="Analyzing...">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" fill="none"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              </svg>
              Analyzing...
            </span>
            <span v-else>
              Find Lawyers
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Validation alert — fires instantly, never reaches the API -->
    <transition name="alert-slide">
      <div
        v-if="validationError"
        class="search-box__alert"
        role="alert"
        aria-live="assertive"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        {{ validationError }}
      </div>
    </transition>

    <!-- Suggestion chips — each fills the textarea with a complete valid prompt -->
    <div class="search-suggestions" role="group" aria-label="Suggested searches">
      <span class="search-suggestions__label">Try:</span>
      <button
        v-for="suggestion in suggestions"
        :key="suggestion.label"
        class="search-suggestions__chip"
        @click="useSuggestion(suggestion.prompt)"
        type="button"
        :disabled="isLoading"
      >
        {{ suggestion.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import '@/styles/home/SearchBox.css'

const props = defineProps({
  isLoading: { type: Boolean, default: false },
})

const emit = defineEmits(['search'])

const query           = ref('')
const isFocused       = ref(false)
const validationError = ref('')
const textareaRef     = ref(null)

const placeholder =
  'Describe your legal situation in detail. Include what happened, ' +
  'when it occurred, what outcome you need, and any relevant details...'

// ── Full prompts for each chip ────────────────────────────────────────────────
// All pass the backend validation: 4+ sentences, 50+ chars, English only
const suggestions = [
  {
    label: 'Divorce & custody',
    prompt:
      'I am going through a difficult divorce and need legal help with the separation process. ' +
      'My spouse and I have two children aged 6 and 9, and we cannot agree on custody arrangements. ' +
      'We also have shared property and assets that need to be divided fairly. ' +
      'I am looking for a family lawyer who specializes in divorce and child custody cases in Lebanon.',
  },
  {
    label: 'Contract breach',
    prompt:
      'I signed a business contract with a supplier six months ago for goods worth a significant amount. ' +
      'The other party has failed to deliver as agreed and is now refusing to refund my payment. ' +
      'I have all the signed documents, invoices, and written communication as evidence. ' +
      'I need a lawyer who handles commercial disputes and contract enforcement cases.',
  },
  {
    label: 'Car accident injury',
    prompt:
      'I was involved in a car accident in Beirut last month where the other driver ran a red light. ' +
      'I suffered injuries that required hospital treatment and my vehicle was seriously damaged. ' +
      'The other driver insurance company is offering a settlement that does not cover my expenses. ' +
      'I need a personal injury lawyer to help me claim full compensation for my damages and medical bills.',
  },
  {
    label: 'Labor dispute',
    prompt:
      'I was recently dismissed from my job without proper notice or severance pay after four years of employment. ' +
      'My employer also withheld my last two months of salary and refused to provide an end-of-service letter. ' +
      'I have my employment contract, payslips, and written communications documenting the situation. ' +
      'I am looking for a labor law attorney to help me recover my rights and unpaid wages.',
  },
]

// ── Validation — identical rules to the backend ───────────────────────────────
const validate = (text) => {
  const trimmed = text.trim()

  if (!trimmed)
    return 'Please describe your legal situation before searching.'

  if (trimmed.length < 50)
    return `Too short (${trimmed.length}/50 characters). Please provide more detail about your case.`

  const sentences = trimmed.split(/[.!?\n]+/).filter((s) => s.trim().length > 0)
  if (sentences.length < 4)
    return `Please write at least 4 sentences — you have ${sentences.length}. More detail means better matches.`

  if (!/^[A-Za-z0-9\s.,!?'"():;-]+$/.test(trimmed))
    return 'Please write in English only. Arabic and other characters are not supported yet.'

  return ''
}

const canSubmit = computed(() => query.value.trim().length >= 50 && !props.isLoading)

const adjustHeight = () => {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 200) + 'px'
}

const handleBlur = () => {
  isFocused.value = false
  if (query.value.trim().length > 0)
    validationError.value = validate(query.value)
}

// Fill textarea with the full prompt and focus it
const useSuggestion = (prompt) => {
  query.value = prompt
  validationError.value = ''
  nextTick(() => {
    adjustHeight()
    textareaRef.value?.focus()
  })
}

// Re-validate live so the error clears as soon as the user fixes their text
watch(() => query.value, (val) => {
  if (validationError.value)
    validationError.value = validate(val)
})

const handleSearch = () => {
  if (props.isLoading) return

  // Validate BEFORE emitting — never reaches the store or API if invalid
  const error = validate(query.value)
  if (error) {
    validationError.value = error
    return
  }

  validationError.value = ''
  emit('search', query.value.trim())
}
</script>