<template lang="pug">
  MediaDetailTitleLayout(:media="tv")
    span.ma-2.pa-1.subtitle-2.grey {{tv.number_of_seasons}} 季
    span.ma-2.pa-1.subtitle-2.grey {{tv.number_of_episodes}} 集
</template>
<script>
import MediaDetailTitleLayout from "@/layouts/MediaDetailTitleLayout.vue";
export default {
  components: {
    MediaDetailTitleLayout
  },
  props: {
    tv: {
      type: Object,
      required: true
    }
  }
};
</script>