<template>
  <section>
    <div class="text-center text-h4">Create New Ticket</div>
    <hr class="my-3">
    <v-col cols="6">
      <v-select
        :items="AllEnquiriesData"
        v-model="SelectedEnquiry"
        item-value="id"
        item-text="enquiryType"
        label="What Product Are You Having Problems With?"
        dense
        outlined
        @change="nextStep"
      ></v-select>
    </v-col>

    <v-col v-if="EnquiryCategorySelect" cols="6">
      <v-select

        :items="AllEnquiryCategoryData"
        v-model="SelectedEnquiryCategoryData"
        item-value="id"
        item-text="enquiryCategoryVal"
        label="Choose from the list which problem you might be experiencing"
        dense
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
      class="mt-3"
      v-if="VueEditorShow"
      v-model="files"
      color="deep-purple accent-4"
      counter
      label="You can attach multiple screenshots of the error messages"
      multiple
      placeholder="Select your files"
      prepend-icon="mdi-paperclip"
      outlined
      :show-size="1000"
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
        x-large
        color="primary"
        dark
        @click="SaveEnquiry"
      >
        Submit Issue
      </v-btn>
    </div>
    <loading-overlay-form :value-over="loadingOverlay" info="Recording your issue and notifying one of our agents please wait..."/>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import aws from "aws-sdk";
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
      SelectedEnquiryCategoryData:'',
      loadingOverlay:false,
      endpoint: 'https://centrino.nyc3.digitaloceanspaces.com',
      uploadurl: null,
      filename: '',
      filetype: '',
      files: [],
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
        console.log(this.AllEnquiryCategoryData)
      })
    },

    ...mapActions({
      GetEnquiriesData: 'enquiries/enquiries-service/getEnquiries',
      GetEnquiryCategoryData: 'enquiries/enquiries-service/getEnquiriesCategory',
      UploadEnquiry: 'tickets/ticket-service/saveEnquiry',
      ShareTicketNo:'tickets/ticket-info/SaveTicketNo',
      ShareUserName:'tickets/ticket-info/SaveUsername',
    }),
   async upload() {
      const aws = require('aws-sdk')

      const spaces = new aws.S3({
        endpoint: 'nyc3.digitaloceanspaces.com',
        accessKeyId: 'A2G22IBUK6WU5PBTI2B2',
        secretAccessKey: 'aq7nq1SJmttMjgBUfs0sK/h1op8R71bHTblFbM5IeSk'
      })

      const params = {
        Bucket: 'centrino',
        Key: `${this.$auth.$storage.getUniversal('authenticatedUser').preferred_username}-${this.SelectedEnquiryCategoryData}`,
        Expires: 60 * 3, // Expires in 3 minutes
        ContentType: this.files[0].type,
        ACL: 'public-read', // Remove this to make the file private
      }

      this.uploadurl = spaces.getSignedUrl('putObject', params)

      fetch(this.uploadurl, {
        method: 'PUT',
        body: this.files[0],
        headers: {
          'Content-Type': this.files[0].type,
          'x-amz-acl': 'public-read',
        }
      }).then((res) => {
        console.log(res)
      })
        .catch((c) => {
          console.log(c)
        })
    },

    SaveEnquiry() {
      this.loadingOverlay=true
      let payload = {
        CustomerId:this.$auth.$storage.getUniversal('authenticatedUser').sub,
        EnquiryCategoryId:this.SelectedEnquiryCategoryData,
        FirstMessage:this.VueEditorContent,
        SaccoId:this.$auth.$storage.getUniversal('authenticatedUser').sacco_id,
        Attachments:`${this.$auth.$storage.getUniversal('authenticatedUser').preferred_username}-${this.SelectedEnquiryCategoryData}`
      }


      this.UploadEnquiry(payload).then(()=>{

        this.upload().then((e)=>{
          setTimeout(()=>this.loadingOverlay=false,4000)
        })

        this.ShareTicketNo(this.GetTicketNo)

        this.ShareUserName(this.$auth.$storage.getUniversal('authenticatedUser').preferred_username)

      }).catch((e)=>{
        console.log(e)
      }).finally(()=>{
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
