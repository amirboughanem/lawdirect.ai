import { defineStore } from 'pinia'
import { ref } from 'vue'
import { searchLawyers as apiSearch, getLawyerById as apiFetch } from '@/services/api'

export const useLawyerStore = defineStore('lawyer', () => {
  // ── State ─────────────────────────────────────────────────────────────────
  const lawyers       = ref([])
  const currentLawyer = ref(null)
  const isLoading     = ref(false)
  const error         = ref(null)

  // ── Client-side prompt guard (mirrors backend validation) ─────────────────
  // Gives instant feedback before the round-trip.
  const validatePrompt = (prompt) => {
    if (!prompt || typeof prompt !== 'string') return false
    const trimmed = prompt.trim()
    if (trimmed.length < 50) return false
    const sentences = trimmed.split(/[.!?\n]+/).filter((s) => s.trim().length > 0)
    if (sentences.length < 4) return false
    return /^[A-Za-z0-9\s.,!?'"():;-]+$/.test(trimmed)
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  /**
   * Semantic lawyer search.
   * Sets error instead of throwing so the template can show inline feedback.
   */
  const searchLawyers = async (prompt) => {
    error.value   = null
    lawyers.value = []
    isLoading.value = true

    if (!validatePrompt(prompt)) {
      error.value =
        'Please describe your legal situation in at least 4 complete sentences ' +
        '(50+ characters, English only) so we can find the right match.'
      isLoading.value = false
      return
    }

    try {
      lawyers.value = await apiSearch(prompt)
    } catch (err) {
      error.value = err.message
      lawyers.value = []
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch one lawyer profile by ID.
   */
  const getLawyerById = async (id) => {
    error.value         = null
    currentLawyer.value = null
    isLoading.value     = true

    const numericId = Number(id)
    if (!Number.isInteger(numericId) || numericId <= 0) {
      error.value     = `Invalid lawyer ID: ${id}`
      isLoading.value = false
      return
    }

    try {
      currentLawyer.value = await apiFetch(numericId)
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const clearLawyers      = () => { lawyers.value = [];       error.value = null }
  const clearCurrentLawyer = () => { currentLawyer.value = null; error.value = null }

  return {
    lawyers,
    currentLawyer,
    isLoading,
    error,
    validatePrompt,
    searchLawyers,
    getLawyerById,
    clearLawyers,
    clearCurrentLawyer,
  }
})