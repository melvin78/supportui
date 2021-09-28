<template>
  <section >
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
        item-value="enquiryId"
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
    >
 Submit Issue
    </v-btn>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "create-new-ticket",
  layout:"main",
  middleware:"rolecheck",

  data(){
    return{
      EnquiriesComboBox:null,
      EnquiryCategorySelect:false,
      SelectedEnquiry:'',
      VueEditorShow:false,
      VueEditorContent:'',
      files: [],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{
          'color': ['#F00', '#0F0', '#00F', '#000', '#FFF', 'color-picker']
        }
        ],


        [{ list: "ordered" }, { list: "bullet" }],

        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
      ]

    }
  },

  methods:{

    nextStep(){

      this.EnquiryCategorySelect = true
      this.GetEnquiryCategoryData(this.SelectedEnquiry).then(()=>{
        console.log(this.AllEnquiryCategoryData)
      })
    },

    ...mapActions({
    GetEnquiriesData: 'enquiries/enquiries-service/getEnquiries',
      GetEnquiryCategoryData: 'enquiries/enquiries-service/getEnquiriesCategory'
    })
  },
  computed:{
    ...mapGetters({
      AllEnquiriesData:"enquiries/enquiries-service/getEnquiry",
      AllEnquiryCategoryData:"enquiries/enquiries-service/getEnquiryCategory"
    })
  },


  created() {
    this.GetEnquiriesData().then(()=>{
this.EnquiriesComboBox = this.AllEnquiriesData
    } )

  }
}
</script>

<style scoped>

</style>
