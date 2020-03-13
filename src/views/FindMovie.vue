<template lang="pug">
  div
    h1 this is find movie page
    h2 select
    v-container.movie-list
      v-row
        v-col(cols="6" v-for="movie in movies" :key="movie.id")
          Card(:movie="movie",:genres="genres")
      v-pagination(@input="getMovies" circle total-visible="7" v-model="page" :length="total_pages")

</template>
<script>
import Card from "@/components/Card.vue";
export default {
  data() {
    return {
      page: 1,
      total_pages: 1,
      movies: [],
      popularTop: 0,
      genres: []
    };
  },
  components: {
    Card
  },
  created() {
    this.getMovies(1);
    this.getGenres();
    // await
  },
  mounted() {
    console.log("mounteddddd");
  },
  methods: {
    getMovies(page) {
      this.axios
        .get("https://api.themoviedb.org/3/discover/movie/", {
          params: {
            api_key: "6c78209662b809b81596ac7af717a7f7",
            language: "zh-TW",
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
    },
    getGenres() {
      this.axios
        .get("https://api.themoviedb.org/3/genre/movie/list", {
          params: {
            api_key: "6c78209662b809b81596ac7af717a7f7",
            language: "zh-TW"
          }
        })
        .then(res => {
          console.log(res.data.genres);
          this.genres = res.data.genres;
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