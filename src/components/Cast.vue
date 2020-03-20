<template lang="pug">
  v-dialog(v-model="dialog")
    template(v-slot:activator="{on}")
      v-card.cast(v-on="on" v-if="cast" class="white--text d-flex " color="transparent" flat)
        //- :to="`/person/${cast.id}/${cast.name}`"
        .cast-img(:style="[genderClass(cast.gender),bgcImg(cast.profile_path)]")
        // @/
        hr(class="white--text white")
        v-card-title {{cast.character}}
        v-card-subtitle(class="grey--text") {{cast.name}}
    v-card
      v-card-title it is a dialog title
      v-card-actions
        v-spacer
        v-btn(text color="green darken-1" @click="dialog=false") 取消
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
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
.cast-img
  width: 10vw
  height: 10vw
  border-radius: 50% !important

.cast
  flex-direction: column
  align-items: center
  justify-content: center

.v-card__text, .v-card__title
  word-break: break-word
</style>