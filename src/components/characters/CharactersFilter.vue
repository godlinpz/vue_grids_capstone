<template>
    <div class="characters-filter">
        <ul class="characters-types">
            <li v-for="type of types" :key="type" 
                :class="type === typeFilter ? 'selected' : ''"
                @click="() => setTypeFilter(type)"
            >
                {{ type }}
            </li>
        </ul>
        <div class="character-search">
            <input placeholder="Search by name..." type="text" name="character-search" v-model="search" @keyup.enter="onSearch">
            <button @click.prevent="onSearch">Search</button>
        </div>
    </div>
</template>

<script setup>
  import { useStore } from 'vuex';
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const store = useStore();

  const typeFilter = computed(() => store.state.currentTypeFilter);

  const types = ["All", "Human", "Animal", "Alien"];
  const router = useRouter();

  const setTypeFilter = typeName => { 
    store.dispatch('setTypeFilter', typeName);
    store.dispatch('setNameFilter', '');

    router.push('/characters/1');
  };

  const search = ref('');
  const onSearch = () => {
    store.dispatch('setNameFilter', search.value);
    router.push('/characters/1');
  }

</script>


<style scoped lang="scss">
    .characters-filter {
        padding: 10px 15px;
        background: #e3e3e3;
        text-align: left;
        font-size: 16px;
        .characters-types {
            display: inline-block;
            padding: 0;
            margin-right: 20px;

            li {
                display: inline-block;
                padding: 0 5px;
                border: 1px solid black;
                border-left: none;
                cursor: pointer;

                &:hover {
                    background: $accentColor;
                }
                
                &:first-child {
                    border-left: 1px solid black;
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                }

                &:last-child {
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                }

                &.selected {
                    background: black;
                    color: white;
                }
            }
        }

        .character-search {
            display: inline-block;
            
            input {
                border: 1px solid black;
                font-size: inherit;
                padding: 2px 5px;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
            }
            button {
                font-size: inherit;
                border: 1px solid black;
                border-left: none;
                padding: 2px 5px;
                cursor: pointer;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;

                &:hover {
                    background: $accentColor;
                }
            }
        }
    }
</style>