<template lang="pug">
  svg#svg
    g.world(v-if="countries")
      path.country(@click="getLanguage(country.id)"  v-for="country in countries" :key="country.id")
      // path.test
</template>
<script>
import * as d3 from "d3";
import "d3-selection-multi";
import * as topojson from "topojson";

export default {
  data() {
    return {
      svg: null,
      projection: null,
      width: 1200,
      path: null,
      countries: null,
      languages: [],
      countryList: null
    };
  },
  computed: {
    height() {
      return this.width / 2;
    }
  },
  methods: {
    init() {
      this.initSvg();
      this.initData();
      this.loadMap();
      this.loadCountryList();
    },
    initSvg() {
      this.svg = d3.select("svg").attrs({
        width: this.width,
        height: this.height,
        viewbox: `0 0 ${this.width} ${this.height}`
      });
    },
    initData() {
      // projection
      this.projection = d3
        .geoMercator()
        .translate([this.width / 2, this.height / 2])
        .center([0, 50])
        .scale(160);

      console.log(this.projection);

      // path
      this.path = d3.geoPath().projection(this.projection);
    },
    loadCountryList() {
      this.axios.get("https://restcountries.eu/rest/v2/all").then(res => {
        this.countryList = res.data;
      });
    },
    loadMap() {
      let url =
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

      d3.json(url).then(data => {
        this.countries = topojson.feature(
          data,
          data.objects.countries
        ).features;
        console.log(this.countries);

        this.$nextTick(() => {
          const paths = this.svg
            .select(".world")
            .selectAll("path")
            .data(this.countries);

          paths.attrs({ d: d => this.path(d) });
        });
      });
    },
    findcountry(numericCode) {
      return this.countryList.find(
        country => country.numericCode === numericCode
      );
    },
    getLanguage(numericCode) {
      let country = this.findcountry(numericCode);
      console.log(country);
      this.axios
        .get(`https://restcountries.eu/rest/v2/alpha/${country.alpha3Code}`)
        .then(res => {
          console.log(res);
          this.languages = res.data.languages;
          console.log(this.languages);
          this.$emit("languages", this.languages);
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="sass">
svg
  border: solid 1px

path
  &:hover
    fill: #f24
</style>