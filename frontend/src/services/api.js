import axios from 'axios'

// Base API instance — update BASE_URL in your .env file
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Request interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// ─── Response interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred.'
    console.error('[API Error]', message)
    return Promise.reject(new Error(message))
  }
)

// ─── Lawyer endpoints ─────────────────────────────────────────────────────────

/**
 * POST /search
 * Send a case description and receive ranked lawyer matches.
 * @param {string} query - The user's case description text
 * @returns {Promise<Array>} Array of matched lawyer objects
 */
export const searchLawyers = (query) =>
  api.post('/search', { query })

/**
 * GET /lawyers/:id
 * Fetch a single lawyer's full profile by ID.
 * @param {string|number} id - Lawyer ID
 * @returns {Promise<Object>} Lawyer profile object
 */
export const getLawyerById = (id) =>
  api.get(`/lawyers/${id}`)

/**
 * GET /lawyers
 * Fetch all lawyers (for admin / featured listings).
 * @returns {Promise<Array>}
 */
export const getAllLawyers = () =>
  api.get('/lawyers')

export default api