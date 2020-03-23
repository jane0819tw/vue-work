<template lang="pug">
  svg#svg
</template>
<script>
import * as d3 from "d3";
import "d3-selection-multi";
// - import topojson from "topojson";

export default {
  mounted() {
    console.log(this.$el);
    d3.select(this.$el)
      .attrs({ width: 500, height: 500 })
      .append("g")
      .attr("transform", "translate(0, 10)");
    console.log("55555");

    // let aaaa = null;

    this.axios
      .get("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(res => {
        // aaaa = res;
        console.log(res);
        d3.json(res, function(world) {
          console.log("heooooooo");
          var countries = topojson.feature(world, world.objects.countries)
            .features;
          console.log("it is countries", countries);
        });
      });
  }
};
</script>
<style lang="sass">
svg
  border: solid 1px
</style>