<template>
  <characters-filter/>
  <characters-list :chars="chars"/>
  <pager :page-number="pageNumber" :page-total="total" path="characters"/>
  
</template>

<script setup>
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  import CharactersList from '@/components/characters/CharactersList.vue';
  import CharactersFilter from '@/components/characters/CharactersFilter.vue';
  import Pager from '@/components/Pager.vue';

  const props = defineProps({
    pageNumber: {
      type: Number,
      default: 1,
    }
  });
  const pageSize = 3;

  const store = useStore();

  const chars = computed(() => store.getters.characters(props.pageNumber));
  const total = computed(() => Math.ceil(store.getters.charactersTotal/pageSize));

</script>
