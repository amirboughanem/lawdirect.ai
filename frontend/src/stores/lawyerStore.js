import { defineStore } from 'pinia'
import { ref } from 'vue'
import { searchLawyers as apiSearch, getLawyerById as apiGetById } from '@/services/api'

// ─── Mock data (used when backend is not yet running) ─────────────────────────
const MOCK_LAWYERS = [
  {
    id: 1,
    name: 'Rami Khoury',
    primarySpecialty: 'Personal Injury',
    specialties: ['Personal Injury', 'Civil Litigation'],
    jurisdictions: ['Court of Appeal', 'First Instance Court'],
    yearsExperience: 15,
    location: 'Beirut',
    hourlyRate: 150,
    rating: 5.0,
    reviewsCount: 124,
    languages: ['Arabic', 'English'],
    education: 'Lebanese University – Faculty of Law',
    gender: 'Male',
    bio: 'Specializes in automotive liability and insurance claims. Has successfully recovered millions for clients involved in severe accidents across Lebanon.',
    verified: true,
    isOnline: true,
    image: 'https://i.pravatar.cc/150?img=11',
    matchScore: 0.95,
  },
  {
    id: 2,
    name: 'Sarah Nassar',
    primarySpecialty: 'Traffic & Liability Law',
    specialties: ['Traffic Law', 'Civil Liability'],
    jurisdictions: ['Magistrate Court', 'First Instance Court'],
    yearsExperience: 8,
    location: 'Jounieh',
    hourlyRate: 100,
    rating: 4.8,
    reviewsCount: 89,
    languages: ['Arabic', 'French'],
    education: 'Saint Joseph University – Faculty of Law',
    gender: 'Female',
    bio: "Passionate about defending clients' rights. Expert in negotiating with insurance companies to ensure fair compensation for medical expenses and damages.",
    verified: true,
    isOnline: false,
    image: 'https://i.pravatar.cc/150?img=5',
    matchScore: 0.88,
  },
  {
    id: 3,
    name: 'Georges Abou Zeid',
    primarySpecialty: 'Senior Litigator',
    specialties: ['Commercial Litigation', 'Corporate Law'],
    jurisdictions: ['Court of Cassation', 'Court of Appeal'],
    yearsExperience: 22,
    location: 'Beirut',
    hourlyRate: 200,
    rating: 4.9,
    reviewsCount: 210,
    languages: ['Arabic', 'English', 'French'],
    education: 'Lebanese American University – School of Law',
    gender: 'Male',
    bio: 'Extensive trial experience in complex personal injury and commercial cases. Handles the toughest cases. Free initial consultation available.',
    verified: true,
    isOnline: false,
    image: 'https://i.pravatar.cc/150?img=14',
    matchScore: 0.83,
  },
  {
    id: 4,
    name: 'Lara Haddad',
    primarySpecialty: 'Family & Civil Law',
    specialties: ['Family Law', 'Civil Disputes'],
    jurisdictions: ['Personal Status Court', 'First Instance Court'],
    yearsExperience: 6,
    location: 'Tripoli',
    hourlyRate: 80,
    rating: 4.7,
    reviewsCount: 56,
    languages: ['Arabic'],
    education: 'Lebanese University – Faculty of Law',
    gender: 'Female',
    bio: 'Compassionate representation for families and individuals. Specializes in family law while also handling civil disputes arising from accidents.',
    verified: true,
    isOnline: true,
    image: 'https://i.pravatar.cc/150?img=9',
    matchScore: 0.76,
  },
  {
    id: 5,
    name: 'Charbel Rizk',
    primarySpecialty: 'Criminal Defense',
    specialties: ['Criminal Law', 'Traffic Offenses'],
    jurisdictions: ['Criminal Court', 'First Instance Court'],
    yearsExperience: 11,
    location: 'Zahle',
    hourlyRate: 120,
    rating: 5.0,
    reviewsCount: 42,
    languages: ['Arabic', 'French'],
    education: 'Holy Spirit University of Kaslik – Faculty of Law',
    gender: 'Male',
    bio: 'Focused on criminal defense and traffic offenses. Knows the local courts inside and out and consistently achieves favorable outcomes for clients.',
    verified: true,
    isOnline: false,
    image: 'https://i.pravatar.cc/150?img=17',
    matchScore: 0.72,
  },
  {
    id: 6,
    name: 'Maya Sleiman',
    primarySpecialty: 'Dispute Resolution',
    specialties: ['Mediation', 'Arbitration', 'Civil Law'],
    jurisdictions: ['Arbitration Panel', 'First Instance Court'],
    yearsExperience: 4,
    location: 'Sidon',
    hourlyRate: 70,
    rating: 4.6,
    reviewsCount: 18,
    languages: ['Arabic', 'English'],
    education: 'Lebanese University – Faculty of Law',
    gender: 'Female',
    bio: 'Modern approach to legal disputes. Prefers mediation and arbitration to settle claims quickly and efficiently without long court battles.',
    verified: true,
    isOnline: true,
    image: 'https://i.pravatar.cc/150?img=25',
    matchScore: 0.68,
  },
]

// ─── Store ────────────────────────────────────────────────────────────────────
export const useLawyerStore = defineStore('lawyer', () => {
  const lawyers = ref([])
  const currentLawyer = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  /**
   * Search lawyers by case description.
   * Falls back to filtered mock data if API is unavailable.
   */
  const searchLawyers = async (query) => {
    isLoading.value = true
    error.value = null

    try {
      const results = await apiSearch(query)
      lawyers.value = results
      return results
    } catch (err) {
      console.warn('[Store] API unavailable, using mock data:', err.message)
      // Simulate a short delay to mimic a real API call
      await new Promise((r) => setTimeout(r, 900))
      lawyers.value = MOCK_LAWYERS
      return MOCK_LAWYERS
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch a single lawyer by ID.
   * Falls back to mock data if API is unavailable.
   */
  const getLawyerById = async (id) => {
    isLoading.value = true
    error.value = null
    currentLawyer.value = null

    try {
      const result = await apiGetById(id)
      currentLawyer.value = result
      return result
    } catch (err) {
      console.warn('[Store] API unavailable, using mock data:', err.message)
      await new Promise((r) => setTimeout(r, 400))
      const found = MOCK_LAWYERS.find((l) => l.id === Number(id)) || null
      currentLawyer.value = found
      return found
    } finally {
      isLoading.value = false
    }
  }

  const clearCurrentLawyer = () => {
    currentLawyer.value = null
  }

  return {
    lawyers,
    currentLawyer,
    isLoading,
    error,
    searchLawyers,
    getLawyerById,
    clearCurrentLawyer,
  }
})