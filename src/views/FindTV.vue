<template lang="pug">
  div
    h1 this is find tv page
    h2 select
    MediaList(:medias="movies")
      v-pagination(@input="getTVs" circle total-visible="7" v-model="page" :length="total_pages")

</template>
<script>
import MediaList from "@/components/MediaList.vue";
export default {
  data() {
    return {
      page: 1,
      total_pages: 1,
      movies: [],
      popularTop: 0
    };
  },
  components: {
    MediaList
  },

  async mounted() {
    await this.getTVs(1);
    await console.log("mounteddddd");
  },
  methods: {
    async getTVs(page) {
      await this.axios
        .get("https://api.themoviedb.org/3/discover/tv/", {
          params: {
            api_key: "6c78209662b809b81596ac7af717a7f7",
            language: "zh",
            sort_by: "popularity.desc",
            include_video: false,
            page: page,
            with_original_language: "th"
          }
        })
        .then(res => {
          this.movies = res.data.results;
          this.page = page;
          this.total_pages = res.data.total_pages;
          console.log(res.data);
          // -------
          if (!this.popularTop) {
            this.popularTop = this.movies[0].popularity;
          }
        });
    }
  }
};
</script>
<style lang="sass">
*
  //border: solid 1px
.movie-list
  width: 80%
  max-width: 1200px
</style>