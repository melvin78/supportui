<template>
  <v-card>
    <v-card-title>
      Ticket Summary
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search by Ticket No, Enquiry Message, Opened date etc..."
        single-line

      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="TicketRep"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.ticketStatusVal="{ item }">
        <v-chip
          :color="getColor(item.ticketStatusVal)"
          dark
        >
          {{ item.ticketStatusVal }}
        </v-chip>

      </template>

      <template v-slot:item.id="{ item }">

        <v-chip
          class="ma-2"
          color="primary"
          outlined
          pill
          @click="action(item)"
        >
          <div v-if="item.ticketStatusVal==='Assigned'">
            Speak with agent
          </div>
          <div v-else>
            View Details
          </div>
          <v-icon right>
            mdi-clipboard-text
          </v-icon>
        </v-chip>

      </template>


    </v-data-table>
    <v-row justify="center">


    </v-row>

  </v-card>
</template>

<script>
import DataTable from "../../components/data/DataTable";
import ClientReportTable from "../../components/report/ClientReportTable";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "previous-tickets",
  components: {ClientReportTable, DataTable},
  layout: "main",

  data() {
    return {

      TicketRep: [],
      search: '',
      BtnText: '',
      respondOverlay:false,

      headers: [
        {
          text: 'Ticket Number ',
          align: 'start',
          sortable: false,
          value: 'ticketNo',
        },
        {text: 'Ticket Status', value: 'ticketStatusVal'},
        {text: 'Enquiry Type', value: 'enquiryType'},
        {text: 'Created On', value: 'createdAt'},
        {text: 'Agent', value: 'careTakerName'},
        {text: 'View Details/Response', value: 'id', sortable: false},

      ],
    }
  },


  methods: {
    ...mapActions({
      FetchTicketReports: "tickets/ticket-report/fetchTicketReportsByUserId",
      SetTicketBeingViewed: "tickets/ticket-details/SaveTicketBeingViewed",
      SetRoomId: 'chatroom/SetRoomId',
      SetChatHead:'chatroom/SetChatHead',
      SetDialog:'chatroom/SetDialog',
      UnsetDialog:'chatroom/UnsetDialog'
    }),

    action(val) {

      this.SetRoomId(val.ticketNo)
      this.SetChatHead(val.careTakerName)
      this.SetDialog()
      this.respondOverlay=true

      this.$postRepository.GetInboxId.show(val.ticketNo).then((res)=>{
        this.respondOverlay=false
        this.$router.push(`/chat/${val.ticketNo}/${res}`)

      })

    },
    getColor(ticketStatusVal) {
      if (ticketStatusVal === 'Resolved') {

        return 'green'
      } else if (ticketStatusVal === 'Received') {

        return 'orange'
      } else if (ticketStatusVal === 'Cancelled') {

        return 'red'
      } else if (ticketStatusVal === 'Assigned') {

        return 'brown'
      } else if (ticketStatusVal === 'Pending') {

        return 'yellow'
      } else return 'grey'
    },


  },
  computed: {
    ...mapGetters({
      AllTicketReports: "tickets/ticket-report/getTicketreports",
      GetDialog:'chatroom/getDialog',
      GetCustomerName:'chatroom/getChatHead',

    })
  },

  mounted() {
    this.FetchTicketReports(this.$auth.$storage.getUniversal('authenticatedUser').sub).then(() => {
      this.TicketRep = this.AllTicketReports;
    })
  }
}
</script>

<style scoped>

</style>
