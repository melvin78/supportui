<template>
  <div class="text-center">
    <v-overlay :value="valueOver">


      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
      {{info}}

    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "loading-overlay-form",
  props: {
    valueOver: Boolean,
    info:String,
  }
}
</script>

<style scoped>
</style>
