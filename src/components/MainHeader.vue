<template>
  <nav>
    <router-link to="/">Characters</router-link>
    <router-link to="/favorites">Favorites</router-link>
    <router-link to="/favorites" class="hearts">
      <span class="hearts-icon">&hearts;</span>&nbsp;{{ favoritesTotal }}
    </router-link>
  </nav>
</template>

<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  const favoritesTotal = computed(() => store.getters.favoritesTotal);

</script>

<style scoped lang="scss">
nav {
  display: flex;
  width: 100%;
  background: black;
  padding: 24px;
  gap: 10px;
  line-height: 20px;

  a {
    color: #999;
    text-decoration: none;
    font-weight: bold;

    &.router-link-exact-active {
      color: white;
    }

    &:hover {
      color: #ffb93a;
    }

    &.hearts {
      flex-grow: 1;
      text-align: right;

      span.hearts-icon {
        font-size: 20px;
        color: red;
      }
    }
  }
}
</style>