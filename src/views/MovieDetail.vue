<template lang="pug">
  MediaDetailLayout(v-if="movie" :media="movie")
    MovieDetailTitle(slot="title" :movie="movie")
          
</template>
<script>
import MediaDetailLayout from "@/layouts/MediaDetailLayout.vue";
import MovieDetailTitle from "@/components/MovieDetailTitle.vue";

export default {
  async mounted() {
    // this.getMovie(this.$route.params.id);
    await this.getMovie(this.$route.params.id);
    await console.log("get movies");
  },
  data() {
    return {
      movie: null,
      key: this.$route.path
    };
  },
  components: {
    MediaDetailLayout,

    MovieDetailTitle
  },
  methods: {
    async getMovie(id) {
      await this.axios
        .get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: "6c78209662b809b81596ac7af717a7f7",
            language: "zh-TW",
            append_to_response:
              "keywords,credits,images,lists,releases,reviews,similar,translations"
          }
        })
        .then(res => {
          this.movie = res.data;
          console.log(res.data);
          console.log("checkRouted");
        });
    }
  }
};
</script>
