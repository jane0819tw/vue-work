<template lang="pug">
  v-card.banner(v-if="media")
    v-sheet.banner-bgc(v-if="media.backdrop_path" :style="bgcImg(media.backdrop_path)")
    v-sheet.banner-bgc(v-else color="rgba(0,0,0,0.9)")
    v-row.banner-row
      MediaProfile(:media="media")  
      .banner-content.white--text
        slot(name="title")
        Videos(:videos="videos")
        v-card-subtitle.display-1.white--text(v-if="media.overview") 大意
        p {{media.overview}}
        CastList(:media="media")
        slot(name="seasons")
        Similars(:similarGroup="similarGroup")
</template>
<script>
import MediaProfile from "@/components/TheDetailPage/MediaProfile.vue";
import Videos from "@/components/TheDetailPage/Videos.vue";
import CastList from "@/components/TheDetailPage/CastList.vue";
import Similars from "@/components/TheDetailPage/Similars.vue";

export default {
  props: {
    media: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      videos: []
    };
  },
  components: {
    MediaProfile,
    Similars,
    CastList,
    Videos
  },
  computed: {
    similarGroup() {
      let similarGroup = [];

      if (!this.media.similar) return similarGroup;

      let results = this.media.similar.results;

      while (results.length) {
        similarGroup.push(results.splice(0, 3));
      }
      return similarGroup;
    }
  },
  async mounted() {
    await this.loadVideos();
  },

  methods: {
    async loadVideos() {
      if (this.media.videos) {
        this.videos = this.media.videos.results;
      } else {
        await this.getVideo(this.$route.params.id);
      }
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

.banner-content
  flex: 2
  padding: .5em

.banner-bgc
  position: absolute
  width: 100%
  height: 100%
  filter: brightness(0.4)

.banner-row
  max-width: 80%
</style>