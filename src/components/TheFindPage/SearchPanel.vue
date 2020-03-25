<template lang="pug">
v-container
  SearchMap(@languages="deliverLanguages")
  v-row
    v-col(cols=4)
      v-select(dense outlined v-model="selectGenre" chips multiple label="選擇類別" :items="shapeGenres")
        template(v-slot:selection="data")
          v-chip(close 
          @click:close="data.parent.selectItem(data.item)" 
          :key="JSON.stringify(data.item)") {{data.item.text}}
    v-col(cols=4)
      v-select(dense outlined v-model="selectSort" label="排列依序" :items="sorting")
    v-col(cols=3)
      v-text-field(dense outlined v-model="keyword" label="輸入英文關鍵字")
    v-col(cols=1)
      v-icon(large @click="search") mdi-magnify
    
    
</template>
<script>
import SearchMap from "@/components/TheFindPage/SearchMap.vue";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      selectSort: {
        text: "依照熱門程度排序(熱門到冷門)",
        value: "popularity.desc"
      },
      selectGenre: null,
      keyword: "",
      args: {},
      sorting: [
        { text: "依照熱門程度排序(熱門到冷門)", value: "popularity.desc" },
        { text: "依照熱門程度排序(冷門到熱門)", value: "popularity.asc" },
        { text: "依照時間排序(近到遠)", value: "release_date.desc" },
        { text: "依照時間排序(遠到近)", value: "release_date.asc" }
      ]
    };
  },

  props: {
    shapeGenres: {
      type: Array,
      required: true
    }
  },
  components: {
    SearchMap
  },
  methods: {
    ...mapMutations(["updateSearchError"]),

    async dealKeywords() {
      this.keyword = this.keyword.trim().toLowerCase();
      this.$emit("getKeyword", this.keyword);
      // 有keywords 去搜尋
      if (this.keyword) {
        await this.getKeywords();
      }
    },

    async search() {
      this.args = {
        with_genres: this.selectGenre ? this.selectGenre.join("||") : "",
        sort_by: this.selectSort.value
      };
      console.log(this.args);
      await this.dealKeywords();
      await this.$emit("getNewParams", this.args);
    },

    async getKeywords() {
      console.log("get keywords");
      await this.axios
        .get("https://api.themoviedb.org/3/search/keyword", {
          params: {
            api_key: "6c78209662b809b81596ac7af717a7f7",
            query: this.keyword
          }
        })
        .then(res => {
          // keywords list
          console.log("keywords", res.data.results);
          let keyword_results = res.data.results;
          if (!keyword_results.length) {
            this.args.with_keywords = { type: "no", value: this.keyword };
            this.updateSearchError(`無${this.keyword}相關關鍵字，請更換關鍵字`);
          } else {
            this.args.with_keywords = keyword_results
              .map(keyword => keyword.id)
              .join("||");
            this.updateSearchError("");
          }
        });
    }
  }
};
</script>