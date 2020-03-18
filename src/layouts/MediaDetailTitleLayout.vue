<template lang="pug">
  v-card-title.mb-3(v-if="media.id")
    span.font-weight-black.display-2(class="white--text") {{media.title || media.name}} 
    span.ma-2.font-weight-light.headline.grey--text ({{getYear(media.release_date || media.first_air_date)}})
    span.ma-2.font-weight-light.title(class="grey--text") {{media.original_title || media.original_name}}
    slot
</template>
<script>
export default {
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