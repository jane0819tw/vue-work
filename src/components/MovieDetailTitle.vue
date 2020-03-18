<template lang="pug">
  MediaDetailTitleLayout(:media="movie")
    span.ma-2.pa-1.subtitle-2(class="grey") {{movie.runtime}} 分鐘
</template>
<script>
import MediaDetailTitleLayout from "@/layouts/MediaDetailTitleLayout.vue";
export default {
  components: {
    MediaDetailTitleLayout
  },
  props: {
    movie: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="sass">
</style>