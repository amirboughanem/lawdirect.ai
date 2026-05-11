<template>
  <div class="home">
    <HeroSection>
      <template #search>
        <SearchBox @search="handleSearch" />
      </template>
    </HeroSection>

    <ResultsSection
      :lawyers="lawyers"
      :search-query="searchQuery"
      :has-searched="hasSearched"
      :is-loading="isLoading"
      @view-profile="goToProfile"
      @contact="handleContact"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection    from '@/components/home/HeroSection.vue'
import SearchBox      from '@/components/home/SearchBox.vue'
import ResultsSection from '@/components/home/ResultsSection.vue'
import { useLawyerStore } from '@/stores/lawyerStore'

const router      = useRouter()
const lawyerStore = useLawyerStore()

const lawyers     = ref([])
const searchQuery = ref('')
const hasSearched = ref(false)
const isLoading   = ref(false)

const handleSearch = async (query) => {
  searchQuery.value = query
  hasSearched.value = true
  isLoading.value   = true
  lawyers.value     = []

  try {
    lawyers.value = await lawyerStore.searchLawyers(query)
  } catch (err) {
    console.error('Search failed:', err)
  } finally {
    isLoading.value = false
    setTimeout(() => {
      document.querySelector('.results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
}

const goToProfile = (id) => {
  router.push({ name: 'LawyerProfile', params: { id } })
}

const handleContact = (id) => {
  router.push({ name: 'LawyerProfile', params: { id }, query: { contact: '1' } })
}
</script>