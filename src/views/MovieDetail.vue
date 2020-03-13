<template lang="pug">
    v-card.banner( v-if="movie")
      v-sheet.banner-bgc(v-if="movie.backdrop_path" :style="bgcImg(movie.backdrop_path)")
      v-sheet.banner-bgc(v-else color="rgba(0,0,0,0.9)")
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

        .banner-content(class="white--text")
          v-card-title.mb-3
            
            span.font-weight-black.display-2(class="white--text") {{movie.title}} 
            span.ma-2.font-weight-light.headline(class="grey--text") ({{movie.release_date.split("-")[0]}})
            span.ma-2.font-weight-light.title(class="grey--text") {{movie.original_title}}
            span.ma-2.pa-1.subtitle-2(class="grey") {{movie.runtime}} 分鐘
          v-card-subtitle.display-1(v-if="movie.overview" class="white--text") 大意
          p {{movie.overview}}

          v-card-subtitle.display-1(v-if="movie.credits.cast.length" class="white--text") 演員表
          v-row
            v-col(cols="3" v-for="cast in movie.credits.cast" :key="cast.id" v-if="cast.profile_path")
              Cast(:cast="cast")
          h1 {{key}}
          SimilarMovies(:similarGroup="similarGroup")
          
</template>
<script>
import Cast from "@/components/Cast.vue";
import SimilarMovies from "@/components/SimilarMovies.vue";
export default {
  data() {
    return {
      movie: null,
      key: this.$route.path
    };
  },
  components: {
    SimilarMovies,
    Cast
  },
  computed: {
    similarGroup() {
      let results = this.movie.similar.results;
      let similarGroup = [];
      while (results.length) {
        similarGroup.push(results.splice(0, 3));
      }
      return similarGroup;
    }
  },
  created() {
    this.getMovie(this.$route.params.id);
  },
  methods: {
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
  position: relative

.banner *
  filter: brightness(1)

.banner-bgc
  position: absolute
  width: 100%
  height: 100%
  filter: brightness(0.4)

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

.v-card__text, .v-card__title
  word-break: break-word

.carousel-col
  flex-grow: 0
</style>