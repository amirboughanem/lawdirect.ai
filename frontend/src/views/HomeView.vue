<template>
  <div class="home">
    <HeroSection>
      <template #search>
        <!-- Pass store's isLoading so spinner is driven by real API state -->
        <SearchBox
          @search="handleSearch"
          :is-loading="store.isLoading"
        />
      </template>
    </HeroSection>

    <ResultsSection
      :lawyers="store.lawyers"
      :search-query="searchQuery"
      :has-searched="hasSearched"
      :is-loading="store.isLoading"
      :error="store.error"
      @view-profile="goToProfile"
      @contact="handleContact"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLawyerStore } from '@/stores/lawyerStore'

import HeroSection    from '@/components/home/HeroSection.vue'
import SearchBox      from '@/components/home/SearchBox.vue'
import ResultsSection from '@/components/home/ResultsSection.vue'

const router  = useRouter()
const store   = useLawyerStore()

// Only local UI state — everything else lives in the store
const searchQuery = ref('')
const hasSearched = ref(false)

const handleSearch = async (prompt) => {
  searchQuery.value = prompt
  hasSearched.value = true

  await store.searchLawyers(prompt)

  // Scroll to results once they arrive (error or success)
  if (!store.isLoading) {
    setTimeout(() => {
      document.querySelector('.results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
}

const goToProfile = (id) =>
  router.push({ name: 'LawyerProfile', params: { id } })

const handleContact = (id) =>
  router.push({ name: 'LawyerProfile', params: { id }, query: { contact: '1' } })
</script>