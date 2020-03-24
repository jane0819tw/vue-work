<template lang="pug">
  div
    v-container.panel
      p count: {{$store.state.count}}
      v-btn(@click="addCount({num:2})") commit count 
      v-btn(@click="update({num:5} )") actions count 
      v-btn(@click="update2({num:100} )") actions2 count 
      SearchMap(@languages="deliverLanguages")
      SearchPanel(:shapeGenres="shapeGenres" @getNewParams="getNewParams",@getKeyword="getKeyword")
      MediaList(:medias="medias",:genres="genres")
        v-pagination(@input="getMedias" circle total-visible="7" v-model="page" :length="total_pages")
</template>
<script>
import MediaList from "@/components/TheFindPage/MediaList.vue";
import SearchPanel from "@/components/TheFindPage/SearchPanel.vue";
import SearchMap from "@/components/TheFindPage/SearchMap.vue";
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
        include_video: false
      },
      keyword: "",
      languages: "cn"
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
    SearchPanel,
    SearchMap
  },
  async mounted() {
    await this.getMedias(1);
    await this.getGenres();
    this.updateSearchError("");
    await console.log("mounteddddd");
  },
  methods: {
    ...mapMutations(["addCount", "updateSearchError"]),
    ...mapActions(["update", "update2"]),

    getKeyword(value) {
      this.keyword = value;
    },

    getNewParams(args) {
      console.log("layout get", args);
      if (args.with_keywords && args.with_keywords.type) {
        console.log("have keyword");
        this.medias = [];
      } else {
        this.getMedias(1, args);
      }
    },

    deliverLanguages(languages) {
      this.languages = languages.map(language => language.iso639_1).join("||");
      console.log("deliver", this.languages);
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

    async getMedias(page, args = {}) {
      let new_arg = {};
      Object.assign(new_arg, this.def_params);
      Object.assign(new_arg, {
        page: page,
        with_original_language: this.languages
      });
      Object.assign(new_arg, args);

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
          if (!this.medias.length) {
            this.updateSearchError(
              `在類別中查詢關鍵字${this.keyword}無結果，更換類別或是關鍵字`
            );
          }
          console.log(this.medias);
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