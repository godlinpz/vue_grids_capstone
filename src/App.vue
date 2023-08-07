<template>
  <main-header/>
  <router-view/>
</template>

<script setup>
  import MainHeader from '@/components/MainHeader';

</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
