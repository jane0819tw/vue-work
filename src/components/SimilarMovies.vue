<template lang="pug">
div
  v-card-subtitle.display-1(v-if="similarGroup.length" class="white--text") 相關電影
  v-carousel(v-if="similarGroup.length>0")
    v-carousel-item(v-for="(item,index) in similarGroup" reverse-transition="fade-transition"
transition="fade-transition" :key="index")
      v-sheet(height="90%")
        v-row(align="center" justify="center")
          v-col.carousel-col(v-for="movie in item" :key="movie.id")
            v-card(:to="`/movies/${movie.id}/${movie.title}`")
            
              v-img(v-if="movie.poster_path" :src="getImageUrl(movie.poster_path)")
              v-sheet(v-else width=185 color="white" height="100%")
              v-card-title {{movie.title}}
</template>
<script>
export default {
  props: {
    similarGroup: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.$forceUpdate();
  },
  methods: {
    // toMovie(movie) {
    //   console.log(movie.id);
    //   console.log(movie.title);
    //   let id = "455714";
    //   let title = "%E6%A8%A1%E7%8A%AF%E7%94%9F";
    //   // this.$router.push({
    //   //   name: "MovieDetail",
    //   //   // path: "/movies",
    //   //   params: {
    //   //     id,
    //   //     title
    //   //   }
    //   // });
    //   // location.reload();
    // }
  }
};
</script>
<style lang="sass">
</style>