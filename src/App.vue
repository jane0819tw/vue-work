<template lang="pug">
  v-app
    Navbar
    transition(name="page" mode="out-in")
      keep-alive
        router-view(:key="$route.path")
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Navbar from "@/components/Navbar";
export default {
  name: "App",

  components: {
    HelloWorld,
    Navbar
  },

  data: () => ({
    //
  })
};
</script>
<style lang="sass">
.page-enter-active, .page-leave-active
  transition: opacity .2s
.page-enter, .page-leave-to
  opacity: 0
</style>