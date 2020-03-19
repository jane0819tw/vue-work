<template lang="pug">
    v-card.banner(v-if="movie")
      v-sheet.banner-bgc(v-if="movie.backdrop_path" :style="bgcImg(movie.backdrop_path)" )
      v-sheet.banner-bgc(v-else color="rgba(0,0,0,0.9)" )
      v-row.banner-row
        .banner-info
          v-img(:src="getImageUrl(movie.poster_path,185,'media')" width="80%")
          .genres
            v-chip(class="ma-2" label)(v-for="genre in movie.genres" big :key="genre.id") 
              v-icon mdi-label
              span {{genre.name}}
          .keywords
            v-chip(class="ma-2" color="secondary" v-for="keyword in movie.keywords.results" big :key="keyword.id")
              v-icon(left) mdi-sword
              span {{keyword.name.toUpperCase()}}
          v-chip.ma-2(color="yellow" v-if="movie.origin_country.length")
            span {{movie.origin_country[0]}}
        .banner-content(class="white--text")
          TVDetailTitle(:tv="movie")
          Videos(:videos="movie.videos.results")
          v-card-subtitle.display-1(v-if="movie.overview" class="white--text") 大意
          p {{movie.overview}}
          CastList(:media="movie")
          Seasons(v-if="movie.seasons.length" :seasons="movie.seasons")
          Similars(:similarGroup="similarGroup")
          

</template>
<script>
import TVDetailTitle from "@/components/TVDetailTitle.vue";
import Videos from "@/components/Videos.vue";
import CastList from "@/components/CastList.vue";
import Similars from "@/components/Similars.vue";
import Seasons from "@/components/Seasons.vue";
export default {
  data() {
    return {
      movie: null
    };
  },
  components: {
    TVDetailTitle,
    Similars,
    CastList,
    Videos,
    Seasons
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

.banner-info
  flex: 1
  margin: 1em

.banner-content
  flex: 2
  padding: .5em
</style>