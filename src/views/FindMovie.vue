<template lang="pug">
  div
    h1 this is find movie page
    h2 select
    v-container.movie-list
      v-row
        v-col(cols="6" v-for="movie in movies" :key="movie.id")
          v-hover
            template(v-slot="{hover}")
              v-card.movie(:elevation="hover? 5:1")
                v-img.poster_img(v-if="movie.poster_path" :src="getImageUrl(movie.poster_path)" width="185")
                .dark(v-else)
                .content
                  v-card-title {{movie.title}}
                  v-card-subtitle {{movie.original_title}}
                  .date
                    v-icon(left) mdi-calendar-range
                    v-card-text {{shapeDate(movie.release_date)}}
                  v-card-text {{shapeDescription(movie.overview)}}
                  .genres
                    v-btn.genre(v-for="genreID in movie.genre_ids" small :key="genreID") {{getGenreName(genreID)}}
      v-pagination(@input="getMovies" circle total-visible="7" v-model="page" :length="total_pages")

</template>
<script>
export default {
  data() {
    return {
      page: 1,
      total_pages: 1,
      movies: [],
      genres: [],
      monMap: {
        1: "JAN",
        2: "FEB",
        3: "MAR",
        4: "APR",
        5: "MAY",
        6: "JUN",
        7: "JUL",
        8: "AUG",
        9: "SEP",
        10: "OCT",
        11: "NOV",
        12: "DEC"
      }
    };
  },
  created() {
    this.getMovies(1);
    this.getGenres();
  },
  mounted() {
    console.log("mounteddddd");
  },
  methods: {
    getImageUrl(url) {
      return `http://image.tmdb.org/t/p/w185/${url}`;
    },
    getGenreName(id) {
      return this.genres.find(genre => genre.id == id).name;
    },
    shapeDescription(content) {
      return content.length > 100 ? `${content.slice(0, 100)}...` : content;
    },
    shapeDate(date) {
      let d = date.split("-");
      return `${this.getMonth(d[1])} ${d[2]},${d[0]}`;
    },
    getMonth(month) {
      return this.monMap[parseInt(month)];
    },
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
.movie-list
  width: 80%
  max-width: 1200px
.movie
  display: flex

.poster_img
  flex: 4
.dark
  flex: 4
  background-color: #888
.content
  flex: 6
  padding: 1em
.genre
  margin: .5em
.date
  display: flex
  padding-left: 1em
</style>