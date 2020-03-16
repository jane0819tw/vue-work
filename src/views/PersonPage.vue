<template lang="pug">
v-card.d-flex
  .person-img.flex-grow-0.ma-4
    v-img(:src="getImageUrl(person.profile_path)")
    ProfileInfo(:personInfo="person")
    
  .person-content
    v-card-title {{person.name}}
    v-card-text {{person.biography}}
    v-card-subtitle 演戲作品
    v-radio-group(v-model="media_type" row)
      v-radio(label="電影" value="movie" color="red")
      v-radio(label="電視劇" value="tv")
    v-list
      v-list-item-group
          v-list-item(v-for="history in historyCasts" :key="history.id" :to="`/movies/${history.id}/${history.title}`")
            v-list-item-avatar
              v-img(v-if="history.poster_path" :src="getImageUrl(history.poster_path)")
              v-img(v-else src="@/assets/black.jpeg")

            v-list-item-content
              v-list-item-title 
                span(v-if="history.release_date") {{history.release_date.split("-")[0]|| history.release_date}}
                v-list-item-icon
                  v-icon mdi-record-circle
                span.ml-2 {{history.title||history.name}} 
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
      let media_type_arr = this.person.combined_credits.cast.filter(
        cast => cast.media_type === this.media_type
      );
      if (this.media_type === "movie") {
        media_type_arr = media_type_arr.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      }
      return media_type_arr;
    }
  },
  created() {
    this.getPerson();
  },
  methods: {
    getPerson() {
      this.axios
        .get(`https://api.themoviedb.org/3/person/${this.$route.params.id}`, {
          params: {
            api_key: "6c78209662b809b81596ac7af717a7f7",
            // language: "zh-TW",
            append_to_response: "combined_credits,tagged_images,external_ids"
          }
        })
        .then(res => {
          this.person = res.data;
          console.log(res.data);
        });
    }
  }
};
</script>
<style lang="sass">
.person-content
  width: 100%
</style>