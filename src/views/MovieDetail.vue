<template lang="pug">
    v-card.banner(v-if="movie")
      v-sheet.banner-bgc(v-if="movie.backdrop_path" :style="bgcImg(movie.backdrop_path)")
      v-sheet.banner-bgc(v-else color="rgba(0,0,0,0.9)")
      v-row.banner-row
        .banner-img
          v-img(:src="getImageUrl(movie.poster_path)" width="80%")
          .genres
            v-chip(class="ma-2" label)(v-for="genre in movie.genres" big :key="genre.id") 
              v-icon mdi-label
              span {{genre.name}}
          .keywords(v-if="movie.keywords")
            v-chip(class="ma-2" color="secondary" v-for="keyword in movie.keywords.keywords" big :key="keyword.id")
              v-icon(left) mdi-sword
              span {{keyword.name.toUpperCase()}}

        .banner-content(class="white--text")
          MovieDetailTitle(:movie="movie")
          Videos(:videos="videos")
          v-card-subtitle.display-1(v-if="movie.overview" class="white--text") 大意
          p {{movie.overview}}
          CastList(:media="movie")
          Similars(:similarGroup="similarGroup")
          
</template>
<script>
import MovieDetailTitle from "@/components/MovieDetailTitle.vue";
import Videos from "@/components/Videos.vue";
import CastList from "@/components/CastList.vue";
import Similars from "@/components/Similars.vue";
export default {
  async mounted() {
    // this.getMovie(this.$route.params.id);
    await this.getMovie(this.$route.params.id);
    await console.log("get movies");
    await this.getVideo(this.$route.params.id);
    await console.log("get videos");
  },
  data() {
    return {
      movie: null,
      key: this.$route.path,
      videos: []
    };
  },
  components: {
    Similars,
    MovieDetailTitle,
    CastList,
    Videos
  },
  computed: {
    similarGroup() {
      let similarGroup = [];

      if (!this.movie.similar) return similarGroup;

      let results = this.movie.similar.results;

      while (results.length) {
        similarGroup.push(results.splice(0, 3));
      }
      return similarGroup;
    }
  },
  created() {},
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
        });
    },
    async getVideo(id) {
      await this.axios
        .get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
          params: {
            api_key: "6c78209662b809b81596ac7af717a7f7"
          }
        })
        .then(res => {
          this.videos = res.data.results.filter(
            video => video.site === "YouTube"
          );
          console.log(res.data.results);
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