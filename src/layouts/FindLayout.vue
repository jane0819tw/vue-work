<template lang="pug">
  div
    v-container.panel
      p count: {{$store.state.count}}
      v-btn(@click="addCount({num:2})") commit count 
      v-btn(@click="update({num:5} )") actions count 
      v-btn(@click="update2({num:100} )") actions2 count 
      SearchPanel(:shapeGenres="shapeGenres" @getNewParams="getNewParams")
      MediaList(:medias="medias",:genres="genres")
        v-pagination(@input="getMedias" circle total-visible="7" v-model="page" :length="total_pages")
</template>
<script>
import MediaList from "@/components/MediaList.vue";
import SearchPanel from "@/components/SearchPanel.vue";

import { mapState, mapMutations, mapActions } from "vuex"; //
export default {
  props: {
    mediaType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      page: 1,
      total_pages: 1,
      medias: [],
      popularTop: 0,
      genres: [],
      def_params: {
        api_key: "6c78209662b809b81596ac7af717a7f7",
        language: "zh",
        sort_by: "popularity.desc",
        include_video: false,
        with_original_language: "th"
      }
    };
  },
  computed: {
    ...mapState(["testStore"]),
    getTestStore() {
      return this.$store.state.testStore;
    },
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
    await this.getMedias(1);
    await this.getGenres();
    await console.log("mounteddddd");
  },
  methods: {
    ...mapMutations(["addCount"]),
    ...mapActions(["update", "update2"]),
    getNewParams(args) {
      console.log("find movie page get");
      this.getMedias(1, args);
    },
    async getGenres() {
      await this.axios
        .get(`https://api.themoviedb.org/3/genre/${this.mediaType}/list`, {
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
    //
    async getMedias(page, args = {}) {
      let new_arg = {};
      Object.assign(new_arg, this.def_params);
      Object.assign(new_arg, { page: page });
      Object.assign(new_arg, args);
      console.log(new_arg);

      await this.axios
        .get(`https://api.themoviedb.org/3/discover/${this.mediaType}/`, {
          params: new_arg
        })
        .then(res => {
          this.medias = res.data.results;
          this.page = page;
          this.total_pages = res.data.total_pages;
          // -------
          if (!this.popularTop) {
            this.popularTop = this.medias[0].popularity;
          }
        });
    }
  }
};
</script>
<style lang="sass">
.panel
  width: 80%
  max-width: 1200px
</style>