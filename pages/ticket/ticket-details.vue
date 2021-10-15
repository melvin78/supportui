<template>
  <section>
  <v-card>
    <v-card-title>
    <div class="d-flex flex justify-space-around">
     <div>Ticket No: <bdi class="orange--text text-left"> {{FetchTicketReportByTicketNo.ticketNo}}</bdi></div>
      <div>Enquiry Type: <bdi class="orange--text text-right">{{FetchTicketReportByTicketNo.enquiryCategoryVal}}</bdi></div>
    </div>

    </v-card-title>
    <hr  class="my-3"/>
    <v-card-subtitle>
      <div class="text-center text-h6">Attached Screenshots</div>
      <hr  class="my-3"/>
<v-img max-width="250" min-width="250" :src="`https://centrino.nyc3.digitaloceanspaces.com/${FetchTicketReportByTicketNo.attachments}`"></v-img>
    </v-card-subtitle>
    <hr  class="my-3"/>
    <div class="text-center text-h6">Issue Raised</div>
    <hr  class="my-3"/>
    <v-card-text>
      <div v-html="FetchTicketReportByTicketNo.enquiryMessage"></div>
    </v-card-text>
  </v-card>

</section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ticket-details",
  layout:"main",

  methods:{
...mapActions({
  SetTicketReportsByticketNo:'tickets/ticket-report/fetchTicketReportsByTicketNo'
})
  },

  computed:{

    ...mapGetters({
      FetchTicketBeingViewed: 'tickets/ticket-details/getTicketBeingViewed',
      FetchTicketReportByTicketNo:'tickets/ticket-report/getTicketReportsByTicketNo'
    })
  },
  mounted() {

    this.SetTicketReportsByticketNo(this.FetchTicketBeingViewed)


  }


}
</script>

<style scoped>

</style>
