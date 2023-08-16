<template>
  <characters-filter/>
  <template v-if="loading">
    <h2>Loading...</h2>
  </template>
  <template v-else>
    <characters-list v-if="chars.length" :chars="chars"/>
    <h2 v-else>No characters loaded</h2>
  </template>

  <pager :page-number="pageNumber" :page-total="total" path="characters"/>
  
</template>

<script setup>
  import { useStore } from 'vuex';
  import { computed, watchEffect } from 'vue';

  import CharactersList from '@/components/characters/CharactersList.vue';
  import CharactersFilter from '@/components/characters/CharactersFilter.vue';
  import Pager from '@/components/Pager.vue';

  const props = defineProps({
    pageNumber: {
      type: Number,
      default: 1,
    }
  });
  const pageSize = 20;

  const store = useStore();

  const chars = computed(() => store.getters.characters(props.pageNumber));
  const total = computed(() => Math.ceil(store.getters.charactersTotal/pageSize));
  const loading = computed(() => store.getters.loading);

  watchEffect(() => {
    store.dispatch('loadCharacters', props.pageNumber);
  });
</script>
