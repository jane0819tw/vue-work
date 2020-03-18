<template lang="pug">
  v-card
    v-toolbar(elevate-on-scroll shrink-on-scroll)
      v-toolbar-title title
      v-spacer
      v-toolbar-items.hidden-sm-and-down
        v-btn(to="/movies") 
          v-icon mdi-movie
          span 找電影
        v-btn(to="/tvs")
          v-icon mdi-television-box
          span 找影視
        
</template>
<script>
export default {};
</script>
<style lang="sass">
</style>