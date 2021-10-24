<template>
  <section>
    <div class="text-center text-h4">Check Ticket Status</div>
    <hr class="my-3">

    <ticket-status/>
  </section>
</template>

<script>
import TicketStatus from "../../components/data/ticket-status";
export default {
  name: "check-ticket-status",
  layout:'main',
  components: {TicketStatus}
}
</script>

<style scoped>

</style>
