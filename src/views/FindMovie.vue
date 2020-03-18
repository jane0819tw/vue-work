<template lang="pug">
  div
    h1 this is find movie page
    v-container.panel
      SearchPanel(:shapeGenres="shapeGenres" @getNewParams="getNewParams")
      MediaList(:medias="movies",:genres="genres")
        span(v-if="!movies.length") 無查詢結果，請更正查詢條件
        v-pagination(@input="getMovies" circle total-visible="7" v-model="page" :length="total_pages")
      

</template>
<script>
import MediaList from "@/components/MediaList.vue";
import SearchPanel from "@/components/SearchPanel.vue";

export default {
  data() {
    return {
      page: 0,
      total_pages: 1,
      movies: [],
      popularTop: 0,
      genres: [],
      def_params: {
        api_key: "6c78209662b809b81596ac7af717a7f7",
        language: "zh-TW",
        sort_by: "popularity.desc",
        include_video: false,
        page: 1,
        with_original_language: "th"
      }
    };
  },
  computed: {
    shapeGenres() {
      return this.genres.map(genre => {
        return {
          text: genre.name,
          value: genre.id
        };
      });
    }
  },
  components: {
    MediaList,
    SearchPanel
  },
  async mounted() {
    await this.getMovies(1);
    await this.getGenres();
    await console.log("!createdd");
  },
  methods: {
    getNewParams(args) {
      console.log("find movie page get");
      this.getMovies(1, args);
    },
    async getGenres() {
      await this.axios
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
    },
    async getMovies(page, args = {}) {
      let new_arg = {};
      Object.assign(new_arg, this.def_params);
      Object.assign(new_arg, { page: page });
      Object.assign(new_arg, args);
      console.log(new_arg);
      // 移除keywords 是空值

      await this.axios
        .get("https://api.themoviedb.org/3/discover/movie/", {
          params: new_arg
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
  // border: solid 1px
.panel
  width: 80%
  max-width: 1200px
</style>