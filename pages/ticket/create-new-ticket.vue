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
    <v-col cols="6" v-if="VueEditorShow">
      <v-subheader>Set Ticket Priority</v-subheader>
      <v-slider
        v-model="ticketPriority"
        :tick-labels="ticksLabels"
        :max="2"
        step="1"
        thumb-label="always"
        :thumb-color="color[ticketPriority]"
        ticks="always"
        tick-size="2"
      >


      </v-slider>
    </v-col>
    <v-divider/>

    <vue-editor
      ref="quillContainer"
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
    <div  v-if="VueEditorShow" class="text-center mt-3">
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
import {Quill} from 'vue2-editor';
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
      ticketPriority:0,
      ticksLabels: [
      'Low',
      'Medium',
      'High',
    ],
      color:['success','warning','red'],
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



      console.log(file)
      fetch(spaces.getSignedUrl('putObject', params), {
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
          filename:`${this.$auth.$storage.getUniversal('authenticatedUser').sub}-${this.random[i]}`,
          type:this.files[i].type,
        })
      }
     await this.finalupload()


      this.loadingOverlay = true

      // const content = this.VueEditorContent;
      // const div= document.createElement("div");
      // div.innerHTML=content
      // const text= div.textContent || div.innerText || "";
      let payload = {
        CustomerId: this.$auth.$storage.getUniversal('authenticatedUser').sub,
        EnquiryCategoryId: this.SelectedEnquiryCategoryData,
        FirstMessage:this.VueEditorContent,
        SaccoId: this.$auth.$storage.getUniversal('authenticatedUser').sacco_id,
        Attachments: JSON.stringify(this.Attachment),
        PriorityLevel:this.ticketPriority,
        EnquiryId:this.SelectedEnquiry,

      }




      this.UploadEnquiry(payload).then(() => {

        setTimeout(() => this.loadingOverlay = false, 4000)
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
