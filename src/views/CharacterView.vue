<template>
  <template v-if="loading">
    <h2>Loading...</h2>
  </template>
  <template v-else>
    <character v-if="char" mode="wide" :data="char"/>
    <h2 v-else>No such character</h2>
  </template>

</template>
  
  <script setup>
    import { useStore } from 'vuex';
    import { computed, watchEffect } from 'vue';
    import Character from '@/components/characters/Character.vue';

    const props = defineProps({
        id: Number,
    });
    
    const store = useStore();
    const char = computed(() => store.getters.currentCharacter);
    const loading = computed(() => store.getters.loading);
    
    watchEffect(() => {
      store.dispatch('loadCurrentCharacter', props.id);
    });

  </script>
  