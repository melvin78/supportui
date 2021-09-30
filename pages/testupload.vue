<template>
  <div>


    <v-file-input
      v-model="files"
      :show-size="1000"
      accept="image/*"
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
    <v-btn
      @click="upload"
    >
  upload my file
    </v-btn>

    <v-btn
      @click="getfiledata"
    >
      Check file data
    </v-btn>

  </div>
</template>

<script>
import getUploadUrl from "../plugins/upload-digital-ocean";
import {mapGetters} from "vuex";


export default {
  name: "testupload",
  data() {
    return {
      files: [],
      endpoint: 'https://centrino.nyc3.digitaloceanspaces.com',
      uploadurl:null,
      filename:'',
      filetype:''

    }
  },

  computed:{
    ...mapGetters({
      SignedUrl:'uploads/signed/getUrl'
    })
  },

  methods: {

    getfiledata() {

      this.filename= this.files[0].name
      this.filetype= this.files[0].type
      console.log(this.files[0])
      console.log(this.filename)
      console.log(this.filetype)

    },

    upload() {
      const aws = require('aws-sdk')

      const spaces = new aws.S3({
        endpoint:'nyc3.digitaloceanspaces.com',
        accessKeyId: 'A2G22IBUK6WU5PBTI2B2',
        secretAccessKey: 'aq7nq1SJmttMjgBUfs0sK/h1op8R71bHTblFbM5IeSk'
      })

      const params = {
        Bucket: 'centrino',
        Key: this.filename,
        Expires: 60 * 3, // Expires in 3 minutes
        ContentType: this.filetype,
        ACL: 'public-read', // Remove this to make the file private
      }

      this.uploadurl=spaces.getSignedUrl('putObject',params)

      fetch(this.uploadurl, {
        method: 'PUT',
        body: this.files[0],
        headers: {
          'Content-Type': this.files[0].type,
          'x-amz-acl': 'public-read',
        }
      }).then((res)=>{console.log(res)})
        .catch((c)=>{console.log(c)})
    }

    },

    getMyurl() {
      this.uploadurl = getUploadUrl(this.files[0].name, this.files[0].type)

      console.log(this.uploadurl)

    },



}
</script>

<style scoped>

</style>
