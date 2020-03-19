<template lang="pug">
  FindLayout(:mediaType="mediaType")

</template>
<script>
import FindLayout from "@/layouts/FindLayout.vue";
export default {
  data() {
    return {
      mediaType: "movie"
    };
  },
  components: {
    FindLayout
  }
};
</script>