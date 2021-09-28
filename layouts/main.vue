<template>
  <v-app dark>
    <v-app-bar
      app

      flat
    >



      <v-tabs
        centered
        class="ml-n9"

      >
        <v-tab
          v-for="item in items"
          :key="item.id"
          @click="goTo(item.link)"
        >
          {{ item.desc }}
        </v-tab>
      </v-tabs>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            class="hidden-sm-and-down"
            color="grey darken-1 shrink"
            size="32"
            v-bind="attrs"
            v-on="on"
          >

          </v-avatar>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in avatarItems"
            :key="index"
          >
            <v-list-item-title @click="execute">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>


    </v-app-bar>

    <v-main >
      <v-container>
        <v-card >
          <hr class="my-3">

          <Nuxt/>
        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "main",
  data: () => ({

    avatarItems: [
      {title: 'Log Out'},
      {title: 'About Us'},

    ],
    items: [

      {
        id: 1,
        desc: 'Dashboard',
        link: '/account/home'


      },

      {
        id: 2,
        desc: 'Previous Tickets',
        link: '/account/previous-tickets'


      },
      {
        id: 3,
        desc: 'Previous Tickets',
        link: 'previous-tickets'


      },

    ],
  }),

  methods: {

    goTo(val) {
      this.$router.push(val)
    },

    execute(){

    }
  }
}
</script>

<style scoped>

</style>
