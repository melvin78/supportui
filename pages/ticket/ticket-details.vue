<template>
  <section>
    <v-card>
      <v-card-title>
        <div class="d-flex flex justify-space-around">
          <div>Ticket No:
            <bdi class="orange--text text-left"> {{ FetchTicketBeingViewed }}</bdi>
          </div>
          <div>Enquiry Type:
            <bdi class="orange--text text-right">{{ FetchTicketReportByTicketNo.enquiryCategoryVal }}</bdi>
          </div>
        </div>

      </v-card-title>
      <hr class="my-3"/>

      <hr class="my-3"/>
      <div class="text-center text-h6">Issue Raised</div>
      <hr class="my-3"/>
      <v-card-text>
        <div v-html="FetchTicketReportByTicketNo.firstMessage"></div>

      </v-card-text>
    </v-card>
    <hr class="my-3"/>
    <PreviousMessages/>
    <hr class="my-3"/>
    <vue-editor
      v-if="VueEditorShow"
      v-model="VueEditorContent"
      :editor-toolbar="customToolbar"
      class="grey lighten-5 black--text"
      placeholder="Describe the problem you are experiencing in as much detail as possible. You can also include attachments"
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
    <div v-if="VueEditorShow" class="text-center mt-3">
      <v-btn
        color="primary"
        dark
        x-large
        @click="SendResponse"
      >
        Submit Issue
      </v-btn>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import PreviousMessages from "../../components/data/PreviousMessages";

export default {
  name: "ticket-details",
  components: {PreviousMessages},
  layout: "main",
  data(){
    return{
      VueEditorShow: true,
      VueEditorContent: '',
      files: [],
      Attachment:[],
      random: [],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{
          'color': ['#F00', '#0F0', '#00F', '#000', '#FFF', 'color-picker']
        }
        ],


        [{list: "ordered"}, {list: "bullet"}],

        [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}]
      ]
    }
  },

  methods: {
    ...mapActions({
      SetTicketReportsByticketNo: 'tickets/ticket-report/fetchTicketReportsByTicketNo'
    }),

    async finalupload() {

      for (let i = 0; i < this.files.length; i++) {
        await this.upload(this.files[i], i)
      }
    },
    async upload(file, i) {
      const aws = require('aws-sdk')


      const spaces = new aws.S3({
        endpoint: 'fra1.digitaloceanspaces.com',
        accessKeyId: 'BZRHZTJTNKDJCTJVAMAT',
        secretAccessKey: 'kMg78E+lA/mmIdeJTxAXbswvN28tNDLJ28m0umkMG8A'
      })



      const params = {
        Bucket: 'centrino-cdn',
        Key: `support/${this.$auth.$storage.getUniversal('authenticatedUser').preferred_username}-${this.random[i]}`,
        Expires: 60 * 3, // Expires in 3 minutes
        ContentType: file.type,
        ACL: 'public-read', // Remove this to make the file private
      }



      fetch(spaces.getSignedUrl('putObject', params), {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read',
        }
      })


    },

    SendResponse() {

      for (let i = 0; i < this.files.length; i++) {
        this.random.push(Math.floor(1000 + Math.random() * 9000))
      }

      for (let i = 0; i < this.files.length; i++) {
        this.Attachment.push({
          filename:`${this.$auth.$storage.getUniversal('authenticatedUser').preferred_username}-${this.random[i]}`
        })
      }


      this.loadingOverlay = true
      let payload = {
        ResponseText:this.VueEditorContent ,
        TicketNumber: this.FetchTicketBeingViewed,
        From: this.$auth.$storage.getUniversal('authenticatedUser').sub,
        to: this.FetchTicketReportByTicketNo.careTaker,
        Attachments: JSON.stringify(this.Attachment),
        SocketId:this.FetchSocketId
      }


      this.$postRepository.AddResponse.create(payload).then(() => {

        this.finalupload()
          .then((e) => {
            setTimeout(() => this.loadingOverlay = false, 4000)
            this.Attachment.length=0;
          })

        // this.ShareTicketNo(this.GetTicketNo)
        //
        // this.ShareUserName(this.$auth.$storage.getUniversal('authenticatedUser').preferred_username)

      }).catch((e) => {

      })
    },
  },

  computed: {

    ...mapGetters({
      FetchTicketBeingViewed: 'tickets/ticket-details/getTicketBeingViewed',
      FetchTicketReportByTicketNo: 'tickets/ticket-report/getTicketReportsByTicketNo',
      FetchSocketId:'tickets/ticket-details/getSocketId'
    })
  },
  mounted() {

    this.SetTicketReportsByticketNo(this.FetchTicketBeingViewed)

  }


}
</script>

<style scoped>

</style>
