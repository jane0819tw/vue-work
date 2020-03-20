<template lang="pug">
  v-hover
    template(v-slot="{hover}")
      v-card.movie(:elevation="hover? 5:1" :to="toDetailPage(movie)")
        v-img.poster_img(:src="getImageUrl(movie.poster_path,185,'media')")
        .content 
          //- size: 半徑; width：寬度; rotate: 起點角度; value: 0~100 圓環比例
          v-row(align="center")
            v-progress-circular.popular(:value="shapePopularValue(movie.popularity)" :size="40" :width="6" :color="getPopularColor(shapePopularValue(movie.popularity))" :rotate="0") {{shapePopularPercent(movie.popularity)}}
            .titles
              v-card-title {{movie.title || movie.name}}
              v-card-subtitle {{movie.original_title || movie.original_name}}
          .date
            v-icon mdi-calendar-range
            v-card-text {{shapeDate(movie.release_date|| movie.first_air_date)}}
          v-card-text {{shapeDescription(movie.overview)}}
          .genres
            v-btn.genre(v-if="getGenreName(genreID)" v-for="genreID in movie.genre_ids" small :key="genreID") {{getGenreName(genreID)}}

</template>
<script>
export default {
  data() {
    return {
      monMap: {
        1: "JAN",
        2: "FEB",
        3: "MAR",
        4: "APR",
        5: "MAY",
        6: "JUN",
        7: "JUL",
        8: "AUG",
        9: "SEP",
        10: "OCT",
        11: "NOV",
        12: "DEC"
      }
    };
  },
  props: {
    movie: {
      type: Object,
      required: true
    },
    genres: {
      type: Array,
      required: true
    }
  },
  methods: {
    toDetailPage(media) {
      return {
        name: media.title ? "MovieDetail" : "TVDetail",
        params: { title: media.title || media.name, id: media.id }
      };
    },
    getGenreName(id) {
      //console.log(this.genres);
      let genre = this.genres.find(genre => genre.id == id);
      return genre ? genre.name : "";
    },
    shapeDescription(content) {
      return content.length > 100 ? `${content.slice(0, 100)}...` : content;
    },
    shapeDate(date) {
      let d = date.split("-");
      return `${this.getMonth(d[1])} ${d[2]},${d[0]}`;
    },
    shapePopularPercent(num) {
      return `${parseInt(this.shapePopularValue(num))}%`;
    },
    shapePopularValue(value) {
      return value * 4 > 100 ? 100 : value * 4;
    },
    getPopularColor(value) {
      if (value > 50) {
        return value > 75 ? "red" : "yellow";
      } else {
        return value > 50 ? "green" : "blue";
      }
    },
    getMonth(month) {
      return this.monMap[parseInt(month)];
    }
  }
};
</script>
<style lang="sass">
.movie
  display: flex

.poster_img
  flex: 4
.dark
  flex: 4
  background-color: #888
.content
  flex: 6
  padding: 1em
.genre
  margin: .5em
.date
  display: flex
  padding-left: 1em
.popular
  font-size: 12px
</style>