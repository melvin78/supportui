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
          @click="action(item.ticketNo)"
        >
          View Details
          <v-icon right>
            mdi-clipboard-text
          </v-icon>
        </v-chip>
      </template>


    </v-data-table>

  </v-card>
</template>

<script>
import DataTable from "../../components/data/DataTable";
import ClientReportTable from "../../components/report/ClientReportTable";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "previous-tickets",
  components: {ClientReportTable, DataTable},
  layout:"main",

  data(){
    return{

      TicketRep:[],
      search: '',
      BtnText:'',

      headers: [
        {
          text: 'Ticket Number ',
          align: 'start',
          sortable: false,
          value: 'ticketNo',
        },
        { text: 'Ticket Status', value: 'ticketStatusVal' },
        { text: 'Enquiry Type', value: 'enquiryType' },
        { text: 'Created On', value: 'createdAt' },
        { text: 'View Details/Response', value: 'id',sortable: false },

      ],
    }
  },


  methods:{
  ...mapActions({
    FetchTicketReports:"tickets/ticket-report/fetchTicketReportsByUserId",
    SetTicketBeingViewed:"tickets/ticket-details/SaveTicketBeingViewed",
  }),

    action(val){
    this.SetTicketBeingViewed(val).then(()=>{
      this.$router.push('/ticket/ticket-details')
    })
    },
    getColor (ticketStatusVal) {
      if (ticketStatusVal === 'Resolved'){

        return 'green'
      }
      else if (ticketStatusVal === 'Received'){

        return 'orange'
      }
      else if (ticketStatusVal === 'Cancelled'){

        return 'red'
      }
      else if (ticketStatusVal === 'Assigned') {

        return 'brown'
      }
      else if (ticketStatusVal === 'Pending') {

        return 'yellow'
      }
      else return 'grey'
    },


  },
  computed:{
    ...mapGetters({
      AllTicketReports:"tickets/ticket-report/getTicketreports"
    })
  },

  mounted() {
    this.FetchTicketReports(this.$auth.$storage.getUniversal('authenticatedUser').sub).then(()=>{
      this.TicketRep= this.AllTicketReports;
    })
  }
}
</script>

<style scoped>

</style>
