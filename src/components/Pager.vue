<template>
    <div class="pager">
        Page {{ pageNumber }} of {{ pageTotal }} 
        <router-link :disabled="isFirstPage" :to="prevPageLink">&lt;&lt;&nbsp;Prev</router-link>&nbsp;
        <router-link :disabled="isLastPage" :to="nextPageLink">Next&nbsp;&gt;&gt;</router-link>
    </div>
</template>

<script setup>
    import { computed, ref, toRefs, watch, watchEffect } from 'vue';

    const props = defineProps({
        pageNumber: { 
            type: Number,
        },
        pageTotal: { 
            type: Number,
        },
        path: String,
    });

    const isFirstPage = computed(() => props.pageNumber === 1);
    const isLastPage = computed(() => props.pageNumber >= props.pageTotal);
    const prevPageLink = computed(() => isFirstPage.value ? '': `/${props.path}/` + (props.pageNumber - 1));
    const nextPageLink = computed(() => isLastPage.value ? '': `/${props.path}/` + (props.pageNumber + 1));
    
</script>

<style scoped lang="scss">
    .pager {
        text-align: right;

        a {
            background: none;
            text-decoration: none;
            border: none;
            cursor: pointer;
            font-size: 15px;
            color: black;

            &:hover {
                color: $accentColor;
            }

            &[disabled=true] {
                color: gray;
                cursor: default;
                pointer-events: none;
            }
        }
    }
</style>