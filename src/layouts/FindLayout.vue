<template lang="pug">
  div
    v-container.panel
      //- p count: {{$store.state.count}}
      //- v-btn(@click="addCount({num:2})") commit count 
      //- v-btn(@click="update({num:5} )") actions count 
      //- v-btn(@click="update2({num:100} )") actions2 count 
      
      SearchPanel(:shapeGenres="shapeGenres" @getNewParams="getNewParams",@getKeyword="getKeyword")
      MediaList(:medias="medias",:genres="genres")
        v-pagination(@input="getMedias" circle total-visible="7" v-model="page" :length="total_pages")
</template>
<script>
import MediaList from "@/components/TheFindPage/MediaList.vue";
import SearchPanel from "@/components/TheFindPage/SearchPanel.vue";

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
      search_args: {}
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
    // SearchMap
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
    setMediaRelatedData(medias, total_pages, page = 1) {
      this.medias = medias;
      this.total_pages = total_pages;
      this.page = page;
      if (!this.popularTop) {
        this.popularTop = this.medias[0].popularity;
      }
    },
    searchFailed(message) {
      console.log("cannot find any related keyword");
      console.log("--------set medias to  []");
      this.updateSearchError(message);
      this.setMediaRelatedData([], 1);
    },
    getNewParams(args) {
      if (args.with_keywords && args.with_keywords.type) {
        //- type: no
        // 正常搜尋
        this.searchFailed(
          `關鍵字資料庫無${this.keyword}相關結果，請更換關鍵字`
        );
      } else {
        this.search_args = args;
        this.getMedias(1);
        this.searchFailed("");
        console.log("--------get medias!!");
      }
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
          console.log("genres:", res.data.genres);
          this.genres = res.data.genres;
        });
    },
    filterDoubleKey(arr) {
      let keyArr = arr.map(item => item.id);

      return arr.filter((item, index) => index === keyArr.indexOf(item.id));
    },
    async getMedias(page) {
      console.log("page", page);
      let new_arg = {};
      Object.assign(new_arg, this.def_params);
      Object.assign(new_arg, { page });
      Object.assign(new_arg, this.search_args);
      console.log("start to get medias with", new_arg);
      await this.axios
        .get(`https://api.themoviedb.org/3/discover/${this.mediaType}/`, {
          params: new_arg
        })
        .then(res => {
          //- 有時候有double key 的問題
          this.medias = this.filterDoubleKey(res.data.results);

          if (!this.medias.length) {
            this.searchFailed(
              `在類別中查詢關鍵字${this.keyword}無結果，更換類別或是關鍵字`
            );
          } else {
            this.setMediaRelatedData(this.medias, res.data.total_pages, page);
            console.log(this.medias);
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