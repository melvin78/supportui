<template>
  <Card class="h-full">
    <v-card-title>Incremented</v-card-title>
    <v-card-text>
      <v-card-title class="headline" primary-title>
        Rate Our Services
      </v-card-title>
      <v-card-text>
      If you love our services kindly give us a star rating.

        <div class="text-center mt-12">
          <v-rating
            v-model="rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            hover
          />
        </div>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-space-between">
        <v-btn text>
          No Thanks
        </v-btn>
        <v-btn color="primary" text>
          Rate Now
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </Card>
</template>

<script>
import Card from "./Card";
export default {
  name: "rating",
  components: {Card},
  data: () => ({
    rating: 3,
    colors: ['green', 'purple', 'orange', 'indigo', 'red'],
    rating2: 4.5
  }),
  methods: {
    genColor(i) {
      return this.colors[i]
    }
  }
}
</script>

<style scoped>

</style>
