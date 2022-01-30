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


    </v-app-bar>

    <v-main>
      <v-container>

        <v-row class="mt-2">
          <v-col
            style="
            max-height: 300px;
             background: #eee;
  box-shadow: 0 8px 8px -4px lightblue;
             "
            cols="12"
            sm="6"
            md="8"

          >
            <vue-perfect-scrollbar
              :settings="{suppressScrollX: true, wheelPropagation: false}"
              class="h-100 rtl-ps-none ps scroll"
              style="height:100%"
            >

              <v-row key no-gutters>


                <v-col
                  v-for="(message, index) in messages"
                  :key="index"
                  cols="12"
                >
                  <transition-group
                    appear
                    name="fade-up"
                    tag="div"
                    class="pr-5"
                  >
                    <div
                      :class="message.senderId===$auth.$storage.getUniversal('authenticatedUser').sub?'bubble-right':'bubble-left'"
                      key>
                      <v-card
                        class="mx-auto"
                        :color="message.senderId===$auth.$storage.getUniversal('authenticatedUser').sub?'blue lighten-5':''"
                        max-width="400"
                      >
                        <v-card-title>

                          <span class="text-h6 font-weight-light">{{ message.timestamp }}</span>
                        </v-card-title>

                        <v-card-text class="font-weight-bold">
                          <div v-html="message.content">

                          </div>
                        </v-card-text>

                        <v-card-actions>

                        </v-card-actions>
                      </v-card>
                    </div>
                  </transition-group>

                </v-col>


              </v-row>

            </vue-perfect-scrollbar>


          </v-col>

        </v-row>

        <v-row>
          <v-col style="position: relative" cols="12">
            <v-overlay
              :absolute="absolute"
              :value="overlay"
            >
              <v-progress-circular
                :width="30"
                color="green"
                indeterminate
              ></v-progress-circular>
              sending message...
            </v-overlay>
            <vue-editor
              ref="quillContainer"
              v-if="VueEditorShow"
              v-model="VueEditorContent"
              :editor-toolbar="customToolbar"
              class="grey lighten-5 black--text"
              placeholder="Send message"
            />

            <v-file-input
              v-if="VueEditorShow"
              v-model="files"
              :show-size="1000"
              class="mt-3"
              color="deep-purple accent-4"
              counter
              label="You can attach multiple screenshots of the error messages"
              multiple
              outlined
              placeholder="Select your files"
              prepend-icon="mdi-paperclip"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple accent-4"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="text-overline grey--text text--darken-3 mx-2"
                >
        +{{ files.length - 2 }} File(s)
      </span>
              </template>
            </v-file-input>
            <div class="flex d-flex justify-center">
              <v-btn
                @click="SaveEnquiry"
                color="primary">

                Send Message
                <v-icon
                  right
                >
                  mdi-email-send
                </v-icon>
              </v-btn>
            </div>

          </v-col>
        </v-row>
        <v-col cols="12"></v-col>


      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "chat",
  data: () => ({

    chat: [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
    notifications: [],
    unreadNotifications: [],
    messages:[],
    assignedTickets: [],
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
    inbox: {},
    VueEditorShow: true,
    files: [],
    random: [],
    Attachment: [],
    VueEditorContent: '',
    customToolbar: [
      ["bold", "italic", "underline"],
      [{
        'color': ['#F00', '#0F0', '#00F', '#000', '#FFF', 'color-picker']
      }
      ],


      [{list: "ordered"}, {list: "bullet"}],

      [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}]
    ],
    absolute: true,
    overlay: false,


  }),
  computed: {

    ...mapGetters({
      FetchTicketBeingViewed: 'ticket-details/getTicketBeingViewed',
      GetSocketId: 'chatroom/getSocketId'

    })

  },

  methods: {


    goTo(val) {
      this.$router.push(val)
    },

    async finalupload() {

      for (let i = 0; i < this.files.length; i++) {
        await this.upload(this.files[i], i)
      }
    },

    async upload(file, i) {
      const aws = require('aws-sdk')


      const spaces = new aws.S3({
        endpoint: 'fra1.digitaloceanspaces.com',
        accessKeyId: '3ZISN34MM5N5CHWJKNDG',
        secretAccessKey: 'E9nKKkt8+pNpmha+fWi47o4pl9y7h+V/I6/oV2PBB+c'
      })


      const params = {
        Bucket: 'centrino-cdn',
        Key: `centrino-cdn/${this.$auth.$storage.getUniversal('authenticatedUser').sub}-${this.random[i]}`,
        Expires: 60 * 3, // Expires in 3 minutes
        ContentType: file.type,
        ACL: 'public-read', // Remove this to make the file private
      }


      await fetch(spaces.getSignedUrl('putObject', params), {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read',
        }

      })
    },

    async SaveEnquiry() {


      for (let i = 0; i < this.files.length; i++) {
        this.random.push(Math.floor(1000 + Math.random() * 9000))
      }


      for (let i = 0; i < this.files.length; i++) {
        this.Attachment.push({
          filename: `${this.$auth.$storage.getUniversal('authenticatedUser').sub}-${this.random[i]}`
        })
      }
      await this.finalupload()


      this.overlay = true

      // const content = this.VueEditorContent;
      // const div= document.createElement("div");
      // div.innerHTML=content
      // const text= div.textContent || div.innerText || "";
      let payload = {

        ChatId: Math.floor(Math.random() * 1500),
        InboxId: this.inbox.id,
        Content: this.VueEditorContent,
        SenderId: this.$auth.$storage.getUniversal('authenticatedUser').sub,
        RoomUsersUserNameFrom: this.inbox.roomUsersUserNameTo,
        RoomUsersUserNameTo: this.inbox.roomUsersUserNameFrom,
        IndexId: this.$route.params.ticketno,
        ReceiverEmailAddress: this.inbox.roomUsersIdTo,
        UserName: this.$auth.$storage.getUniversal('authenticatedUser').preferred_username,
        Date: new Date(),
        ChatFileUrl: JSON.stringify(this.Attachment),
        Agent: false,
      }


      this.$postRepository.SendMessage.create(payload).then((res) => {
        this.overlay = false
        this.$toast.success('Reply sent', {
          duration: 3000
        })
      })


    },


    GoToChat(val, id, index) {

      this.unreadNotifications.splice(index, 1)
      this.SetTicketBeingViewed(val).then(() => {
        this.$postRepository.MarkAsRead.show(id).then(() => {
          this.$router.push('/ticket/write-response')

        })

      })


    },
  },

  mounted() {


    this.$postRepository.GetSingleRoom.show(this.$route.params.ticketno)
      .then((res) => {

        this.$postRepository.GetMessages.show(res.id).then((messages) => {
          this.messages = messages

        })
        this.inbox = res
      })

    this.$postRepository.GetUnreadMessages.show(this.$auth.$storage.getUniversal('authenticatedUser').sub).then((response) => {

      this.unreadNotifications = response
    })
  }

}
</script>

<style scoped>
.fade-up-enter {
  opacity: 0;
  transform: translateY(40px);
}

.fade-up-enter-active {
  transition: all 0.4s ease;
}

.fade-up-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */
{
  transform: translateX(10px);
  opacity: 0;
}

.fade-up-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.bubble-left {
  float: left;
  margin-right: 10%;
  margin-bottom: 2em;
}

.bubble-right {
  float: right;
  margin-left: 10%;
  margin-bottom: 2em;
}

.smalldesc {
  max-height: 52px;
  overflow: hidden;
  transition: all .3s ease;
}

.smalldesc.expand {
  max-height: 250px;
}

#expend {
  display: none;
}

#expend + .smalldesc {
  max-height: 52px;
  overflow: hidden;
  transition: all .3s ease;
}

#expend:checked + .smalldesc {
  max-height: 250px;
}

label {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

label:hover {
  text-decoration: none;
}

.hover-transition {
  transform: scale(1.05);
  transition: all .2s ease-in-out
}

</style>
