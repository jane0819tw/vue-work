<template lang="pug">
  h1 it is person page {{this.$route.params.id}}
</template>
<script>
export default {
  data() {
    return {
      person: null
    };
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
            language: "zh-TW",
            append_to_response: "combined_credits,tagged_images"
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