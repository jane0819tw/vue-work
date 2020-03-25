<template lang="pug">
  v-row
    v-col
      svg#svg
        g.world(v-if="countries")
          path.country(v-for="country in countries" :key="country.id" @click="getLanguage(country.id)")
    v-col
      v-chip.ma-2(v-if="language.open" :key="language.id" v-for="language in languages" @click:close="language.open = false" close) {{language.name}}  {{language.nativeName}}
        
</template>
<script>
import * as d3 from "d3";
import "d3-selection-multi";
import * as topojson from "topojson";
import d3Tip from "d3-tip";
export default {
  data() {
    return {
      svg: null,
      projection: null,
      width: 1200,
      path: null,
      countries: null,
      languages: [],
      countryList: null,
      tooltip: null
    };
  },
  computed: {
    height() {
      return this.width / 2;
    },
    selectLanguages() {
      let selectLanguages = this.languages.filter(language => language.open);
      this.$emit("languages", selectLanguages);
      return selectLanguages;
    }
  },
  methods: {
    async init() {
      this.initSvg();
      this.initData();
      await this.loadCountryList();
      // await this.setToolTip();
      this.loadMap();
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
        .center([0, 45])
        .scale(160);

      console.log(this.projection);

      // path
      this.path = d3.geoPath().projection(this.projection);
    },
    async loadCountryList() {
      await this.axios.get("https://restcountries.eu/rest/v2/all").then(res => {
        this.countryList = res.data;
        console.log(this.countryList);
        this.setToolTip();
      });
    },
    loadMap() {
      d3.json(
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
      ).then(data => {
        this.countries = topojson.feature(
          data,
          data.objects.countries
        ).features;
        console.log(this.countries);

        this.$nextTick(() => {
          // - after nextTick 才可以抓到畫面上的path
          const paths = this.svg.select(".world").selectAll("path");

          paths
            .data(this.countries)
            .attrs({
              d: d => this.path(d),
              fill: "transparent",
              "stroke-width": 0.5,
              stroke: "rgba(255,255,255,1)"
            })
            .on("mouseover", this.tooltip.show)
            .on("mouseout", this.tooltip.hide);
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
          this.languages = res.data.languages.map(language => {
            language.open = true;
            return language;
          });
          console.log(this.languages);
          this.$emit("languages", this.selectLanguages);
        });
    },
    setToolTip() {
      //- init tooltip
      this.tooltip = d3Tip()
        .attr("class", "d3-tip")
        .offset([-14, 0])
        .html(d => {
          console.log(d.id);
          let country = this.findcountry(d.id);
          console.log(country);
          return `${
            country.flag
              ? `<img class="flag-img" src="${country.flag}"></img>`
              : ""
          }
          <span>${d.properties.name}</span>
          <span>${country.nativeName}</span>
          
          `;
        });
      this.svg.call(this.tooltip);
    }
  },
  async mounted() {
    await this.init();
  }
};
</script>
<style lang="sass">
#svg
  border: solid 1px
  background-color: rgba(0,0,0,0.9)

path
  cursor: pointer
  transition: .3s
  &:hover
    fill: #f9b3b3
.flag-img
  width: 50px
.d3-tip
  line-height: 1
  font-weight: bold
  padding: 12px
  background: rgba(0, 0, 0, 0.8)
  color: #fff
  border-radius: 2px
  pointer-events: none

.d3-tip:after
  box-sizing: border-box
  display: inline
  font-size: 10px
  width: 100%
  line-height: 1
  color: rgba(0, 0, 0, 0.8)
  position: absolute
  pointer-events: none

.d3-tip.n:after
  content: "\25BC"
  margin: -1px 0 0 0
  top: 100%
  left: 0
  text-align: center
</style>