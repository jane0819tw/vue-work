<template lang="pug">
    v-card.banner(v-if="movie" :style="bgcImg(movie.backdrop_path)")
      v-row.banner-row
        .banner-img
          v-img(:src="getImageUrl(movie.poster_path)" width="80%")
          .genres
            v-chip(class="ma-2" label)(v-for="genre in movie.genres" big :key="genre.id") 
              v-icon mdi-label
              span {{genre.name}}
          .keywords
            v-chip(class="ma-2" color="secondary" v-for="keyword in movie.keywords.keywords" big :key="keyword.id")
              v-icon(left) mdi-sword
              span {{keyword.name.toUpperCase()}}

        .banner-content
          h1 {{movie.title}} 
            span ({{movie.release_date.split("-")[0]}})
            span {{movie.original_title}}
            span {{movie.runtime}} 分鐘
          h3 大意
          p {{movie.overview}}
          v-row
            v-col(cols="3" v-for="cast in movie.credits.cast" :key="cast.id" v-if="cast.profile_path")
              v-card.cast(class="d-flex" color="rgba(255,255,255,0.5)" flat)
                .cast-img(:style="bgcImg(cast.profile_path)")
                v-card-title {{cast.character}}
                v-card-subtitle {{cast.name}}
                //- v-img(:src="getImageUrl()")
</template>
<script>
export default {
  data() {
    return {
      movie: null
    };
  },
  created() {
    this.getMovie(this.$route.params.id);
  },
  methods: {
    getImageUrl(url, width = 185) {
      return `http://image.tmdb.org/t/p/w${width}/${url}`;
    },
    bgcImg(url) {
      console.log(this.getImageUrl(url, 1280));
      return {
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${this.getImageUrl(url, 1280)})`
      };
    },
    async getMovie(id) {
      console.log(id);
      await this.axios
        .get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: "6c78209662b809b81596ac7af717a7f7",
            language: "zh-TW",
            append_to_response:
              "keywords,videos,changes,credits,images,lists,releases,reviews,similar,translations"
          }
        })
        .then(res => {
          this.movie = res.data;
          console.log(res.data);
        });
    }
  }
};
</script>
<style lang="sass">
*
  // border: solid 1px
.banner
  display: flex
  justify-content: center
  filter: brightness(0.4)
.banner *
  filter: brightness(1)
.banner-row
  max-width: 80%

.banner-img
  flex: 1
  margin: 1em

.banner-content
  flex: 2
  padding: .5em
.cast-img
  width: 10vw
  height: 10vw
  border-radius: 50% !important

.cast
  flex-direction: column
  align-items: center
  justify-content: center
</style>