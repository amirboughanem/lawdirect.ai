import axios from 'axios'

// ── Axios instance ────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

// ── Response interceptor ──────────────────────────────────────────────────────
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.message ||
      'An unexpected error occurred.'
    console.error('[API]', message)
    return Promise.reject(new Error(message))
  },
)

// ── Normalise ─────────────────────────────────────────────────────────────────
// Converts the actual DB response shape into camelCase for Vue components.
//
// Search response (match_lawyers RPC) fields:
//   lawyer_id, lawyer_name, specialty, governorate,
//   years_of_experience, rating, hourly_rate, reviews_count,
//   bio, image_url, similarity_score
//
// Profile response (fetchLawyer) fields:
//   name, years_of_experience, education, image_url, rating,
//   hourly_rate, reviews_count, gender, email, phone_number,
//   governorate, bio,
//   lawyer_specialties[], lawyer_jurisdictions[], lawyer_languages[]

const normalise = (raw) => {
  // Parse specialties / jurisdictions / languages —
  // search results return a single `specialty` string and embed the rest in `bio`
  // profile results return full arrays from the join tables
  const specialties   = raw.lawyer_specialties   ?? (raw.specialty ? [raw.specialty] : [])
  const jurisdictions = raw.lawyer_jurisdictions ?? parseBioSection(raw.bio, 'Jurisdictions')
  const languages     = raw.lawyer_languages     ?? parseBioSection(raw.bio, 'Languages')

  return {
    // identity
    id:              raw.lawyer_id              ?? raw.id   ?? null,
    name:            raw.lawyer_name            ?? raw.name ?? '',
    bio:             raw.bio                    ?? '',
    education:       raw.education              ?? '',
    image:           raw.image_url              ?? null,   // null → fallback avatar in component

    // practice
    specialties,
    jurisdictions,
    languages,
    primarySpecialty: specialties[0]            ?? '',

    // stats
    yearsExperience: raw.years_of_experience    ?? 0,
    hourlyRate:      raw.hourly_rate            ?? 0,
    rating:          raw.rating                 ?? 0,
    reviewsCount:    raw.reviews_count          ?? 0,

    // contact / meta
    location:        raw.governorate            ?? '',
    gender:          raw.gender                 ?? '',
    email:           raw.email                  ?? '',
    phone:           raw.phone_number           ?? '',

    // similarity score from semantic search (0-100 scale from your RPC)
    matchScore:      raw.similarity_score != null
                       ? raw.similarity_score / 100   // normalise to 0-1 for the match bar
                       : undefined,

    // UI flags
    verified: true,
    isOnline: false,
  }
}

/**
 * Extract a comma-separated list from the bio string.
 * Bio format:
 *   "Lawyer practicing in X, Lebanon.\n
 *    Specialties: A, B\n
 *    Jurisdictions: C, D\n
 *    Languages: E, F\n
 *    Gender: Male\n
 *    N years of experience."
 */
const parseBioSection = (bio, section) => {
  if (!bio) return []
  const match = bio.match(new RegExp(`${section}:\\s*([^\\n]+)`))
  if (!match) return []
  return match[1].split(',').map((s) => s.trim()).filter(Boolean)
}

// ── Endpoints ─────────────────────────────────────────────────────────────────

/**
 * POST /api/v1/lawyers/match
 * Prompt rules (enforced on backend): ≥4 sentences, ≥50 chars, English only.
 */
export const searchLawyers = (prompt) =>
  api
    .post('/api/v1/lawyers/match', { user_prompt: prompt })
    .then((data) => (data.lawyers ?? []).map(normalise))

/**
 * GET /api/v1/lawyers/:id
 */
export const getLawyerById = (id) =>
  api
    .get(`/api/v1/lawyers/${id}`)
    .then((data) => normalise(data.lawyer))

export default api