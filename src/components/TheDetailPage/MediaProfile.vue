<template lang="pug">
  .banner-info.flex-column(justify="start")
    v-col
      v-img(width=300 :src="getImageUrl(media.poster_path,185,'media')")
    v-col.genres
      v-chip(color="success" class="ma-2" label)(v-for="genre in media.genres" big :key="genre.id") 
        v-icon mdi-label
        span {{genre.name}}
    v-col.keywords
      v-chip(class="ma-2" color="primary" v-for="keyword in keywords" big :key="keyword.id")
        v-icon(left) mdi-sword
        span {{keyword.name.toUpperCase()}}
    v-col(v-if="origin_countries.length")
      v-chip.yellow.ma-2(:key="country" v-for="country in origin_countries")
        span {{country}}
        
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    keywords() {
      return this.media.keywords.results || this.media.keywords.keywords;
    },
    origin_countries() {
      return this.media.origin_country ? this.media.origin_country : [];
    }
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
.banner-info
  flex: 1
  margin: 1em
  min-height: 100vh
</style>