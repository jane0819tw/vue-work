<template lang="pug">
  v-card.cast(v-if="cast" class="white--text d-flex " color="transparent" flat :to="`/person/${cast.id}/${cast.name}`")
    .cast-img(:style="[genderClass(cast.gender),bgcImg(cast.profile_path)]")
    hr(class="white--text white")
    v-card-title {{cast.character}}
    v-card-subtitle(class="grey--text") {{cast.name}}
</template>
<script>
export default {
  props: {
    cast: {
      type: Object,
      required: true
    }
  },
  methods: {
    genderClass(gender) {
      // 2===boy 1==girl 0 not special
      let color;
      if (!gender) {
        color = "grey";
      } else {
        color = gender === 2 ? "#092d75" : "#aa1111";
      }
      return {
        border: `solid 5px ${color}`
      };
    }
  }
};
</script>
<style lang="sass">
</style>