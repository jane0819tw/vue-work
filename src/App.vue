<template lang="pug">
  v-app
    Navbar
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
