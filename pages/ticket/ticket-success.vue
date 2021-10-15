<template>
<section>
 <notification-card
 :ticket-no="GetTicketNo.ticketNo"
 :user-name="GetUsername"
 />
</section>
</template>

<script>
import NotificationCard from "../../components/data/notification-card";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "ticket-success",
  components: {NotificationCard},
  layout:"other",

  computed:{
    ...mapGetters({
      GetTicketNo:'tickets/ticket-info/getTicketno',
      GetUsername:'tickets/ticket-info/getUsername'
    })
  }

}
</script>

<style scoped>

</style>
