<template>
    <character mode="wide" :data="char"/>
</template>
  
  <script setup>
    import { useStore } from 'vuex';
    import { computed } from 'vue';
    import Character from '@/components/characters/Character.vue';

    const props = defineProps({
        id: Number,
    });
    
    const store = useStore();
    const char = computed(() => store.getters.characterById(props.id));

  </script>
  