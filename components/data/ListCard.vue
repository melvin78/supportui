<template>
  <Card>
    <v-card-text>
      <div
        class="d-flex justify-space-between align-center flex-wrap mb-4"
      >
        <div class="d-flex align-center">
          <img
            :src="avatar"
            class="mr-md rounded-circle mr-2"
            height="44"
            width="44"
          />
          <div>
            <p class="ma-0">

                {{ title }}

            </p>
            <p class="text--disabled caption ma-0 ">
              {{ subTitle }}
            </p>
          </div>
        </div>
        <div class="">
          <v-btn
            class="mr-2 shadow-sm"
            color="danger"
            dark
            fab
            x-small
            @click="goTo(EmailAddress)"
          >
            <v-icon>{{ buttonIconOne }}</v-icon>
          </v-btn>
          <v-btn
            @click="goTo(skypeAddress)"
            class="mr-2 shadow-sm" color="info" dark fab x-small>
            <v-icon>{{ buttonIconTwo }}</v-icon>
          </v-btn>

        </div>
      </div>
      <v-divider/>
      <div
        class="d-flex justify-space-between align-center flex-wrap mt-4"
      >


      </div>
    </v-card-text>
  </Card>
</template>
<script>
import Card from "../Card";
export default {
  components: {Card},
  props: {
    // Floating Button icon Color
    avatar: {
      type: String,
      default: require('~/assets/images/avatars/004-bald.svg')
    },
    title: {
      type: String,
      default: 'Timothy Clarkson'
    },
    subTitle: {
      type: String,
      default: 'Vue Developer'
    },

    buttonColorOne: {
      type: String,
      default: ''
    },
    buttonIconOne: {
      type: String,
      default: ''
    },
    buttonIconTwo: {
      type: String,
      default: ''
    },
    buttonColorTwo: {
      type: String,
      default: ''
    },

    buttonColorThree: {
      type: String,
      default: ''
    },
    EmailAddress:{
      type:String,
    },

    skypeAddress:{
      type: String
    },
    progressLinearColor: {
      type: String,
      default: 'primary'
    }
  },

  methods:{
    goTo(val){

    }
  },
  data() {
    return {}
  }
}
</script>
