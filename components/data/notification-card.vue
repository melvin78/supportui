<template>
  <v-card
    elevation="2"
    outlined
    shaped
    tile
  >

    <v-card-title>Ticket Created Successfully</v-card-title>
    <v-card-title>Dear,{{UserName}}<br/> Your ticket number is {{TicketNo}}</v-card-title>
    <v-card-text>
      We have received your issue . One of our agents will get back to you shortly
      via email or skype chat. Check your registered email address for the ticket No which you can use to check the
      status of your tickets.

    </v-card-text>
   <v-card-actions>
     <v-btn
     class="primary"
     >
       CHECK TICKET STATUS
     </v-btn>

   </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "notification-card",
  props:{
    UserName:String,
    TicketNo:String,
  }
}
</script>

<style scoped>

</style>
