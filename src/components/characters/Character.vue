<template>
    <router-link v-if="data" :to="mode === 'wide' ? '' : '/character/' + data.id">
        <div :class="'character character-' + mode">
            <img class="character-picture" :src="data.image">
            <div class="character-info">
                <div class="character-name">{{ data.name }}</div>
                <div class="character-details">
                    <span class="character-species">{{ data.species }}</span> - 
                    <span class="character-status">{{ data.status }}</span>
                </div>
                <div v-if="mode === 'wide'" class="character-location">
                    Last known location: <span>{{ data.location.name }}</span>
                </div>
                <div v-if="mode === 'wide'" class="character-episode">
                    First seen in: <span>{{ data.episodeName }}</span>
                </div>
                <button v-if="store.getters.isFavorite(data.id)" class="character-remove-from-fav" @click.prevent="() => removeFromFavorites(data)">Remove from Favorites</button>
                <button v-else class="character-add-to-fav" @click.prevent="() => addToFavorites(data)">Add to Favorites</button>
            </div>
        </div>
    </router-link>
    <div v-else class="character-loading">Loading...</div>
</template>

<script setup>
    import { useStore } from 'vuex';

    const props = defineProps({
        data: Object,
        mode: String,
    });

    const store = useStore();

    const addToFavorites = (char) => {
        store.dispatch('addFavorite', char);
    }
    const removeFromFavorites = (char) => {
        store.dispatch('removeFavorite', char);
    }
</script>

<style scoped lang="scss">
    a {
        color: black;
        text-decoration: none;
    }
    .character {
        text-align: left;
        border: 1px solid #e3e3e3;
        border-radius: 3px;

        .character-picture {
           background: gray;;
        }
    }
    .character-short {
        width: 300px;

        .character-picture {
            min-height: 100px;
            width: 100%;
        }
    }

    .character-wide {
        width: calc(100% - 60px);
        margin: auto;
        margin-top: 15px;
        position: relative;
        padding-right: 250px;

        .character-location {
            margin-bottom: 10px;
        }
        .character-episode {
            margin-bottom: 10px;
        }

        .character-picture {
            height: 100%;
            min-width: 100px;
            min-height: 100px;
            display: block;
            position: absolute;
            right: 0;
        }

    }

    .character-info {
        padding: 10px 10px;
        .character-name {
            margin-bottom: 10px;
            font-size: 20px;
            font-weight: bold;
        }

        .character-details {
            margin-bottom: 10px;
        }
    }

    .character-add-to-fav, .character-remove-from-fav {
        background: black;
        color: white;
        border: none;
        border-radius: 3px;
        padding: 10px;
        cursor: pointer;

        &:hover {
            background: $accentColor;
        }

    }

</style>