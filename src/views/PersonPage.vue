<template lang="pug">
  v-card.d-flex.pa-5(v-if="person")
    .person-img.flex-grow-0.ma-4
      v-img(v-if="person.profile_path" lazy-src :src="getImageUrl(person.profile_path)")
      ProfileInfo(:personInfo="person")
      
    .person-content.ma-5
      v-card-title {{person.name}}
      v-card-text {{person.biography}}
      v-card-subtitle 演戲作品
      v-radio-group(v-model="media_type" row)
        v-radio(label="電影" value="movie" color="red")
        v-radio(label="電視劇" value="tv")
      v-list
        v-list-item-group
            v-list-item(v-if="!historyCasts.length")
              v-list-item-content
                v-list-item-content 無相關 {{media_type}} 作品
            v-list-item(v-for="history in historyCasts" :key="history.id" :to="route(history)")
              v-list-item-avatar
                v-img(v-if="history.poster_path" :src="getImageUrl(history.poster_path)")
                v-img(v-else src="@/assets/black.jpeg")

              .list-content
                span {{getYear(history.release_date || history.first_air_date)}}
                v-list-item-icon
                  v-icon mdi-record-circle
                span {{history.title||history.name}} 
                span(v-if="history.character") 
                  span.grey--text as 
                  span {{history.character}}
            

</template>
<script>
import ProfileInfo from "@/components/ProfileInfo.vue";
export default {
  components: {
    ProfileInfo
  },
  data() {
    return {
      person: {},
      media_type: "movie"
    };
  },
  computed: {
    historyCasts() {
      if (!this.person.combined_credits) {
        return [];
      }
      let media_type_arr = this.person.combined_credits.cast.filter(
        cast => cast.media_type === this.media_type
      );

      media_type_arr = media_type_arr.sort(
        (a, b) =>
          new Date(b.release_date || b.first_air_date) -
          new Date(a.release_date || a.first_air_date)
      );

      return media_type_arr;
    }
  },
  async mounted() {
    await this.getPerson();
    await this.getPersonEng();
  },
  methods: {
    async getPerson() {
      await this.axios
        .get(`https://api.themoviedb.org/3/person/${this.$route.params.id}`, {
          params: {
            api_key: "6c78209662b809b81596ac7af717a7f7",
            language: "zh-TW",
            append_to_response: "combined_credits,external_ids"
          }
        })
        .then(res => {
          this.person = res.data;
          console.log(res.data);
        });
    },
    async getPersonEng() {
      await this.axios
        .get(`https://api.themoviedb.org/3/person/${this.$route.params.id}`, {
          params: {
            api_key: "6c78209662b809b81596ac7af717a7f7",
            append_to_response: "combined_credits,external_ids"
          }
        })
        .then(res => {
          this.person.biography = res.data.biography;
        });
    },
    route(history) {
      let title = history.title || history.name;
      return `/${this.media_type}s/${history.id}/${title}`;
    }
  }
};
</script>
<style lang="sass">
.person-content
  max-width: 700px
  width: 100%
</style>