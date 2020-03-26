<template lang="pug">
  v-card
    v-toolbar(elevate-on-scroll shrink-on-scroll)
      v-toolbar-title WatCh 挖劇
      v-spacer
      v-toolbar-items.hidden-sm-and-down
        v-btn(to="/movies") 
          v-icon mdi-movie
          span 找電影
        v-btn(to="/tvs")
          v-icon mdi-television-box
          span 找影視
        v-btn(@click="chMode")
          v-icon mdi-moon-waxing-crescent

        
</template>
<script>
export default {
  methods: {
    chMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>
<style lang="sass">
</style>