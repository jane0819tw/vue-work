<template lang="pug">
  v-dialog(v-model="dialog" max-width="70%")
    template(v-slot:activator="{on}")
      v-card.cast(v-on="on" v-if="cast" class="white--text d-flex " color="transparent" flat)
        //- :to="`/person/${cast.id}/${cast.name}`"
        .cast-img(:style="[genderClass(cast.gender),bgcImg(cast.profile_path)]")
        // @/
        hr(class="white--text white")
        v-card-title {{cast.character}}
        v-card-subtitle(class="grey--text") {{cast.name}}
    Person(:personId="cast.id")
    
</template>
<script>
import Person from "@/components/Person.vue";
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
  components: {
    Person
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