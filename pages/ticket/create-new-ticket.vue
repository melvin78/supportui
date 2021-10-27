<template>
  <section>
    <div class="text-center text-h4">Create New Ticket</div>
    <hr class="my-3">
    <v-col cols="6">
      <v-select
        v-model="SelectedEnquiry"
        :items="AllEnquiriesData"
        dense
        item-text="enquiryType"
        item-value="id"
        label="What Product Are You Having Problems With?"
        outlined
        @change="nextStep"
      ></v-select>
    </v-col>

    <v-col v-if="EnquiryCategorySelect" cols="6">
      <v-select

        v-model="SelectedEnquiryCategoryData"
        :items="AllEnquiryCategoryData"
        dense
        item-text="enquiryCategoryVal"
        item-value="id"
        label="Choose from the list which problem you might be experiencing"
        outlined
        @change="VueEditorShow=true"
      ></v-select>
    </v-col>
    <v-divider/>

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
        @click="SaveEnquiry"
      >
        Submit Issue
      </v-btn>
    </div>
    <loading-overlay-form :value-over="loadingOverlay"
                          info="Recording your issue and notifying one of our agents please wait..."/>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import LoadingOverlayForm from "../../components/data/loading-overlay-form";

export default {
  name: "create-new-ticket",
  components: {LoadingOverlayForm},
  layout: "main",
  middleware: "rolecheck",

  data() {
    return {
      EnquiriesComboBox: null,
      EnquiryCategorySelect: false,
      SelectedEnquiry: '',
      VueEditorShow: false,
      VueEditorContent: '',
      SelectedEnquiryCategoryData: '',
      loadingOverlay: false,
      endpoint: 'https://centrino.nyc3.digitaloceanspaces.com',
      uploadurl: null,
      filename: '',
      filetype: '',
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
    nextStep() {

      this.EnquiryCategorySelect = true
      this.GetEnquiryCategoryData(this.SelectedEnquiry).then(() => {

      })
    },


    ...mapActions({
      GetEnquiriesData: 'enquiries/enquiries-service/getEnquiries',
      GetEnquiryCategoryData: 'enquiries/enquiries-service/getEnquiriesCategory',
      UploadEnquiry: 'tickets/ticket-service/saveEnquiry',
      ShareTicketNo: 'tickets/ticket-info/SaveTicketNo',
      ShareUserName: 'tickets/ticket-info/SaveUsername',
    }),


    async finalupload() {

      for (let i = 0; i < this.files.length; i++) {
       await this.upload(this.files[i], i)
      }
    },

   async upload(file, i) {
      const aws = require('aws-sdk')


      const spaces = new aws.S3({
        endpoint: 'nyc3.digitaloceanspaces.com',
        accessKeyId: 'A2G22IBUK6WU5PBTI2B2',
        secretAccessKey: 'aq7nq1SJmttMjgBUfs0sK/h1op8R71bHTblFbM5IeSk'
      })



      const params = {
        Bucket: 'centrino',
        Key: `centrino-support-cdn/${this.$auth.$storage.getUniversal('authenticatedUser').preferred_username}-${this.random[i]}`,
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

    SaveEnquiry() {
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
        CustomerId: this.$auth.$storage.getUniversal('authenticatedUser').sub,
        EnquiryCategoryId: this.SelectedEnquiryCategoryData,
        FirstMessage: this.VueEditorContent,
        SaccoId: this.$auth.$storage.getUniversal('authenticatedUser').sacco_id,
        Attachments: JSON.stringify(this.Attachment)
      }


      this.UploadEnquiry(payload).then(() => {

        this.finalupload()
          .then((e) => {
          setTimeout(() => this.loadingOverlay = false, 4000)
        })

        this.ShareTicketNo(this.GetTicketNo)

        this.ShareUserName(this.$auth.$storage.getUniversal('authenticatedUser').preferred_username)

      }).catch((e) => {

      }).finally(() => {
        this.$router.push('/ticket/ticket-success')
      })
    },
  },
  computed: {
    ...mapGetters({
      AllEnquiriesData: "enquiries/enquiries-service/getEnquiry",
      AllEnquiryCategoryData: "enquiries/enquiries-service/getEnquiryCategory",
      GetTicketNo: 'tickets/ticket-service/getTicketno',
    })
  },


  created() {
    this.GetEnquiriesData().then(() => {
      this.EnquiriesComboBox = this.AllEnquiriesData
    })


  }
}
</script>

<style scoped>

</style>
