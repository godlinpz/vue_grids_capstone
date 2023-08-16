<template>
  <characters-list v-if="chars.length" :chars="chars"/>
  <h2 class="favorites">No favorites yet</h2>
</template>

<script setup>
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  import CharactersList from '@/components/characters/CharactersList.vue';

  const store = useStore();

  const chars = computed(() => store.getters.favorites);

</script>