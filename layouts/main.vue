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
          <v-btn icon
                 v-bind="attrs"
                 v-on="on"
          >
            <v-badge :content="notifications.length" color="green">
              <v-icon>mdi-bell-ring-outline</v-icon>
            </v-badge>
          </v-btn>

        </template>
        <v-list class="overflow-y-auto" max-height="400">
          <div v-if="notifications.length===0">
            <v-list-item class="overflow-y-auto">
              <v-list-item-content>
                <v-list-item-title>
                  <i>You have no new notifications</i>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </div>
          <div v-else>
            <v-list-item
              v-for="(item,i) in notifications"
              :key="i"
              class="overflow-y-auto"
            >
              <v-list-item-content>


                <v-list-item-title>New Message Notification</v-list-item-title>

                <v-list-item-subtitle>

                  Agent has responded to your ticket number :
                  <div class="orange--text"> {{ item.ticketNumber }}</div>
                  <v-icon>mdi-message-text-outline</v-icon>
                  <hr class="my-2"/>

                </v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>
          </div>
        </v-list>
        <v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
                 v-bind="attrs"
                 v-on="on"
          >
            <v-badge :content="unreadNotifications.length">
              <v-icon>mdi-history</v-icon>
            </v-badge>
          </v-btn>

        </template>
        <v-list class="overflow-y-auto" max-height="400">
          <div v-if="unreadNotifications.length===0">
            <v-list-item class="overflow-y-auto">
              <v-list-item-content>
                <v-list-item-title>
                  <i>You have no unread messages</i>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </div>
          <div v-else>
            <v-list-item
              v-for="(item,i) in unreadNotifications"
              :key="i"
              class="overflow-y-auto"
            >
              <v-list-item-content>


                <v-list-item-title>Unread Messages</v-list-item-title>

                <v-list-item-subtitle>

                  Unread Message from ticket number:
                  <div class="orange--text"> {{ item.ticketNumber }}</div>
                  <v-icon @click="GoToChat(item.ticketNumber,item.id,i)">mdi-message-text-outline</v-icon>
                  <hr class="my-2"/>

                </v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>
          </div>
        </v-list>
        <v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div v-if="unreadNotifications.length>0">
              <v-btn
                text
                @click="clearNotifications"

              >
                MARK ALL AS READ
              </v-btn>
            </div>

          </v-card-actions>
        </v-card>
      </v-menu>

      <div class="ml-3"></div>

    </v-app-bar>

    <v-main>
      <v-container>
        <v-card>
          <hr class="my-3">

          <Nuxt/>
        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "main",
  data: () => ({

    notifications: [],
    unreadNotifications: [],
    openedTickets: [],

    items: [

      {
        id: 1,
        desc: 'Dashboard',
        link: '/account/home'


      },

      {
        id: 2,
        desc: 'Ticket History',
        link: '/account/previous-tickets'


      },
      {
        id: 3,
        desc: 'Previous Tickets',
        link: '/ticket/check-ticket-status'


      },


    ],
  }),

  methods: {

    goTo(val) {
      this.$router.push(val)
    },

    clearNotifications() {

    },

    refreshNotifications() {

    },

    GoToChat(val, id, index) {
      this.unreadNotifications.splice(index, 1)


      this.SetTicketBeingViewed(val).then(() => {
        this.$postRepository.MarkAsRead.show(id).then(() => {
          this.$router.push('/ticket/ticket-details')

        })

      })


    },

    ...mapActions({
      AddChatMessageToNotificationBar: 'response/response/SetResponse',
      SetTicketBeingViewed: 'tickets/ticket-details/SaveTicketBeingViewed',
      SetSocketId: 'tickets/ticket-details/SetSocketId',
      SetChats: 'tickets/ticket-details/SetChats',


    })
  },

  mounted() {

    this.$postRepository.GetOpenedTickets.show(this.$auth.$storage.getUniversal('authenticatedUser').sub)
      .then((e) => {

        for (let i = 0; i < e.length; i++) {
          var channel = this.$pusher.subscribe(`chatFrom-${e[i]}`);

          channel.bind('sentResponse', (data) => {
            this.notifications.push(data)
          })
          this.$pusher.connection.bind("connected", () => {
            this.SetSocketId(this.$pusher.connection.socket_id)
          })

        }

      })



    // var channel = this.$pusher.subscribe(`chatFrom`);
    //
    // channel.bind('sentResponse', (data) => {
    //   this.notifications.push(data)
    // })
    // this.$pusher.connection.bind("connected", () => {
    //   this.SetSocketId(this.$pusher.connection.socket_id)
    // })


    this.$postRepository.GetUnreadMessages.show(this.$auth.$storage.getUniversal('authenticatedUser').sub).then((response) => {

      this.unreadNotifications = response
    })


  }
}
</script>

<style scoped>

</style>
