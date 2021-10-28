<template>
  <v-card
    class="mx-auto"
    max-width="900"
  >
    <v-toolbar
      color="deep-purple accent-4"
      dark
    >

      <v-toolbar-title>
         {{ chatHeadFirstName }}
      </v-toolbar-title>

      <v-spacer></v-spacer>


    </v-toolbar>
    <div ref="ch" class="fix-chat-overflow">
      <div v-for="(item,i) in Responses"
           :key="i" :class="['d-flex mb-6 pl-2 pt-2 ',item.from===authId?'justify-end' :'justify-start']">
        <v-card elevation="40">
          <v-list subheader>
            <v-subheader>{{ item.createdAt }}</v-subheader>

            <v-list-item>
              <v-list-item-avatar :color="item.from===authId?'blue':'red'">

              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.responseText"></v-list-item-title>
                <div v-if="JSON.parse(item.attachments).length!==0">
                  <h6 class="font-italic">Attachments</h6>
                  <div v-for="(attachment,i) in JSON.parse(item.attachments)" :key="i">
                    <a
                      :href="`https://centrino.nyc3.digitaloceanspaces.com/centrino-support-cdn/${attachment.filename}`"
                      target="_blank">Attachment {{ i }}</a>
                  </div>
                </div>

              </v-list-item-content>

            </v-list-item>

          </v-list>
        </v-card>
      </div>
    </div>
    <v-divider></v-divider>


    <v-card-actions>

      <v-row>
        <v-col cols="12">

        </v-col>
      </v-row>

    </v-card-actions>
  </v-card>
</template>

<script>


import {mapActions, mapGetters} from "vuex";

export default {
  name: "testchat",
  data() {
    return {
      VueEditorShow: true,
      VueEditorContent: '',
      files: [],
      chatHeadFirstName: '',
      chatHeadSecondName: '',
      authId: this.$auth.$storage.getUniversal('authenticatedUser').sub,
      customToolbar: [
        ["bold", "italic", "underline"],
        [{
          'color': ['#F00', '#0F0', '#00F', '#000', '#FFF', 'color-picker']
        }
        ],


        [{list: "ordered"}, {list: "bullet"}],

        [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}]
      ],
      Responses: []

    }
  },
  computed: {
    ...mapGetters({
      TicketBeingViewed: 'tickets/ticket-details/getTicketBeingViewed',
      GetChats: 'tickets/ticket-details/getChats',
      FetchTicketReportByTicketNo: 'tickets/ticket-report/getTicketReportsByTicketNo',

    }),



  },
  methods: {

    ...mapActions({
      AddChatMessageToNotificationBar: 'response/response/SetResponse',
      SetSocketId: 'tickets/ticket-details/SetSocketId',
      SetChats: 'tickets/ticket-details/SetChats',

    })
  },


  mounted() {

    this.$postRepository.GetTicketResponseByTicketNo.show(this.TicketBeingViewed)
      .then((e) => {
        this.Responses = e
      })

    if (this.FetchTicketReportByTicketNo.careTaker!=='00000000-0000-0000-0000-000000000000'){
      this.$postRepository.GetChatHead.show(this.FetchTicketReportByTicketNo.careTaker)
        .then((e) => {

          this.chatHeadFirstName = e.firstName
          this.chatHeadSecondName = e.secondName
        })

    }


    var channel = this.$pusher.subscribe(`chatFrom-${this.TicketBeingViewed}`);

    this.$pusher.connection.bind("connected", () => {
      this.SetSocketId(this.$pusher.connection.socket_id)
    })

    channel.bind('sentResponse', (data) => {
      this.Responses.push(data)

    });


  }


}
</script>


<style scoped>

.fix-chat-overflow {


  height: 500px;
  overflow: auto;
}
</style>
