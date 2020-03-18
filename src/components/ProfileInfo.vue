<template lang="pug">
div
  v-list
    v-list-item-group(disabled)
      v-list-item(v-if="personInfo.birthday" disabled)
        v-list-item-icon
          v-icon mdi-calendar-range
        v-list-item-content {{personInfo.birthday}} 
          span.grey--text {{age}} 歲
      v-list-item(v-if="personInfo.deathday" disabled)
        v-list-item-icon
          v-icon mdi-emoticon-dead
        v-list-item-content {{personInfo.deathday}}
      v-list-item(v-if="personInfo.place_of_birth" disabled)
        v-list-item-icon
          v-icon mdi-home-map-marker
        v-list-item-content {{personInfo.place_of_birth}}
  hr
  v-row.social_group
    v-icon.ma-3(@click="toNewPage(social.value)" target="__blank"
    v-if="personInfo.external_ids[social.name]" 
    v-for="social in socials_mdi"
    :key="social.name"
    ) {{social.icon}}
        
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    personInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    age() {
      let year = new Date().getFullYear();

      return this.personInfo.deathday
        ? this.getYear(this.personInfo.deathday) -
            this.getYear(this.personInfo.birthday)
        : year - this.getYear(this.personInfo.birthday);
    },
    socials_mdi() {
      if (!this.personInfo.external_ids) {
        return [];
      }
      return [
        {
          name: "instagram_id",
          icon: "mdi-instagram",
          value: `https://www.instagram.com/${this.personInfo.external_ids.instagram_id}`
        },
        {
          name: "imdb_id",
          icon: "mdi-movie-open",
          value: `https://www.imdb.com/name/${this.personInfo.external_ids.imdb_id}`
        },
        {
          name: "twitter_id",
          icon: "mdi-twitter",
          value: `https://twitter.com/${this.personInfo.external_ids.twitter_id}`
        },
        {
          name: "facebook_id",
          icon: "mdi-facebook",
          value: `https://www.facebook.com/${this.personInfo.external_ids.facebook_id}`
        }
      ];
    }
  },
  methods: {}
};
</script>
<style lang="sass">
</style>