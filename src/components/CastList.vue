<template lang="pug">
  div
    v-card-subtitle.display-1(v-if="media.credits && media.credits.cast.length" class="white--text") 演員表
    v-row(v-if="media.credits")
      v-col(cols="3" v-for="cast in media.credits.cast" :key="cast.id" v-if="cast.profile_path")
        Cast(:cast="cast")
</template>
<script>
import Cast from "@/components/Cast.vue";
export default {
  mounted() {
    console.log("cast list component is mounted");
  },
  components: {
    Cast
  },
  props: {
    media: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="sass">
</style>