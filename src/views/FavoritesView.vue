<template>
  <characters-list :chars="chars"/>
  </template>

<script setup>
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  import CharactersList from '@/components/characters/CharactersList.vue';

  const store = useStore();

  const chars = computed(() => store.getters.favorites);

</script>
