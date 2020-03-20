<template lang="pug">
div
  v-card-subtitle.display-1(v-if="similarGroup.length" class="white--text") 相關影視
  v-carousel(v-if="similarGroup.length>0")
    v-carousel-item(v-for="(item,index) in similarGroup" reverse-transition="fade-transition"
transition="fade-transition" :key="index")
      v-sheet(height="90%")
        v-row(align="center" justify="center")
          v-col.carousel-col(v-for="media in item" :key="media.id")
            v-card(:to="route(media)")
              v-img(width=185 :src="getImageUrl(media.poster_path,185,'media')")
              v-card-title {{media.title || media.name}}
</template>
<script>
export default {
  props: {
    similarGroup: {
      type: Array,
      required: true
    }
  },
  methods: {
    route(media) {
      let title = media.title || media.name;
      let media_type = media.title ? "movie" : "tv";
      return `/${media_type}s/${media.id}/${title}`;
    }
  }
};
</script>
<style lang="sass">
.carousel-col
  flex-grow: 0
</style>