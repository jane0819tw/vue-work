<template lang="pug">
  v-list(color="transparent")
    v-icon(@click="toNewPage(`https://www.youtube.com/watch?v=${video.key}`)" x-large color="white" v-for="video in videos" :key="video.key") mdi-play-circle
</template>
<script>
export default {
  props: {
    videos: {
      type: Array,
      required: true
    }
  }
};
</script>
<style lang="sass">
</style>