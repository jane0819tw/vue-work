<template lang="pug">
  v-container
    v-row
      v-col(v-if="$store.state.searchError") {{$store.state.searchError}}
    v-row(v-if="medias.length")
      v-col(v-if="media.id" cols="6" v-for="media in medias" :key="media.id")
        Card(:movie="media",:genres="genres")
      slot
</template>
<script>
import Card from "@/components/Card.vue";
export default {
  data() {
    return {};
  },
  props: {
    medias: {
      type: Array,
      required: true
    },
    genres: {
      type: Array,
      required: true
    }
  },
  components: {
    Card
  },
  methods: {}
};
</script>

<style lang="sass">
</style>