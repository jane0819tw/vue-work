<template lang="pug">
MediaDetailLayout(v-if="movie" :media="movie")
  TVDetailTitle(slot="title" :tv="movie")
  Seasons(slot="seasons" v-if="movie.seasons.length" :seasons="movie.seasons")
    </template>
<script>
import MediaDetailLayout from "@/layouts/MediaDetailLayout.vue";
import TVDetailTitle from "@/components/TVDetailTitle.vue";
import Seasons from "@/components/TheDetailPage/Seasons.vue";
export default {
  data() {
    return {
      movie: null
    };
  },
  components: {
    MediaDetailLayout,
    TVDetailTitle,
    Seasons
  },

  async mounted() {
    await this.getTV(this.$route.params.id);
    await console.log("tv detail is mounted");
  },
  methods: {
    async getTV(id) {
      await this.axios
        .get(`https://api.themoviedb.org/3/tv/${id}`, {
          params: {
            api_key: "6c78209662b809b81596ac7af717a7f7",
            //language: "zh-TW",
            append_to_response:
              "videos,keywords,credits,images,lists,releases,reviews,similar,translations"
          }
        })
        .then(res => {
          console.log(res.data);
          this.movie = res.data;
        });
    }
  }
};
</script>

<style lang="sass">
.banner *
  filter: brightness(1)

.banner-bgc
  position: absolute
  width: 100%
  height: 100%
  filter: brightness(0.4)
  min-height: 100vh

.banner-row
  max-width: 80%

.banner-content
  flex: 2
  padding: .5em
</style>