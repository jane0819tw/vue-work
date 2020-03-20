<template lang="pug">
  div
    v-card-subtitle.display-1.white--text 季數
    v-row.seasons
      v-col(cols=4 :key="season.id" v-for="season in seasons")
        v-img(:src="getImageUrl(season.poster_path,185,'media')")
        .text-center.headline {{season.name}}
        .text-center.subtitle-1 {{season.air_date}}
</template>
<script>
export default {
  props: {
    seasons: {
      type: Array,
      required: true
    }
  }
};
</script>
<style lang="sass">
</style>