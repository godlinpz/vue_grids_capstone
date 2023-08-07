<template>
    <div class="characters-list">
        <character v-for="char in chars" key="name" mode="short" :data="char"/>
    </div>
</template>

<script setup>
    import Character from './Character.vue';

    const props = defineProps({
        chars: Array,
    });
</script>

<style scoped>
    .characters-list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding: 15px;
        gap: 15px;
    }
</style>