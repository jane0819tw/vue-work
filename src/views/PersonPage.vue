<template lang="pug">
v-card.d-flex
  .person-img.flex-grow-0
    v-img(:src="getImageUrl(person.profile_path)")
  .person-content
    v-card-title {{person.name}}
    v-card-text {{person.biography}}
    v-card-subtitle 演戲
    v-list
      v-list-item-group
          v-list-item(v-for="history in historyCasts" :key="history.id" :to="`/movies/${history.id}/${history.title}`")
            v-list-item-content
              v-list-item-title 
                span {{history.media_type}}
                span(v-if="history.release_date") {{history.release_date.split("-")[0]|| history.release_date}}
                
                span {{history.title||history.name}} 
                span(v-if="history.character") as {{history.character}}
</template>
<script>
export default {
  data() {
    return {
      person: {}
    };
  },
  computed: {
    historyCasts() {
      return this.person.combined_credits.cast;
    }
  },
  created() {
    this.getPerson();
  },
  methods: {
    getPerson() {
      // https://api.themoviedb.org/3/person/{person_id}?api_key=<<api_key>>&language=en-US
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
</style>