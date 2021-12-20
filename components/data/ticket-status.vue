<template>
  <v-container fluid>
    <v-data-table
      :items="items"
      show-expand
      item-key="ticketnumber"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      :headers="headers"
      :page.sync="page"
      :sort-desc="sortDesc"
    >
      <template v-slot:item.ticketstatus="{ item }">
        <v-chip
            :color="getColor(item.ticketstatus)"
            dark
        >
          {{ item.ticketstatus }}
        </v-chip>
      </template>
      <template v-slot:item.description="{ item }">
        <v-chip
            :color="getDescriptionColor(item.description)"
            dark

        >
          {{ item.description }}
        </v-chip>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-card>
            <v-card-text>
              <v-list-item two-line>
                <v-list-item-content v-if="item.firstmessage!==''">
                  <v-list-item-title>Message</v-list-item-title>
                  <v-list-item-subtitle >
                   {{item.firstmessage}}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content v-if="item.attachments.length>0">
                  <v-list-item-title>Attachments</v-list-item-title>
                  <v-list-item-subtitle v-for="(item,i) in item.attachments">
                    <a :href="item.filename">attachment {{i+1}}</a>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content v-if="item.resolvedon!=null">
                  <v-list-item-title>Resolved</v-list-item-title>
                  <v-list-item-subtitle>{{item.resolvedon}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content v-if="item.caretaker!==null">
                  <v-list-item-title>Agent Assigned</v-list-item-title>
                  <v-list-item-subtitle>{{ item.caretaker }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content v-if="item.dateassigned!==null">
                  <v-list-item-title>Date Assigned</v-list-item-title>
                  <v-list-item-subtitle>{{ item.dateassigned }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
<!--              Enquiry: {{item.firstmessage}}-->
<!--              <div v-if="item.attachments.length>0">-->
<!--                <div v-for="(item,i) in item.attachments">-->
<!--                  <a :href="item.filename">attachment {{i+1}} </a>-->
<!--                </div>-->
<!--              </div>-->
<!--              <v-divider vertical></v-divider>-->
<!--              <div>-->

<!--              </div>-->
            </v-card-text>

          </v-card>



        </td>

      </template>

    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "ticket-status",
  data () {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      singleExpand: true,
      expanded:[],
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'ticketNo',
      headers: [
        {text:'Ticket Number',value:"ticketnumber"},
        {text:'Ticket Status',value:"ticketstatus"},
        {text:'Enquiry Category',value:"enquirycategory"},
        {text:'Opened On',value:"openedon"},
        {text:'Priority level',value:"description"},
        { text: 'ViewDetails', value: 'data-table-expand' },

      ],
      items: [

      ],
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {

      return this.keys.filter(key => key !== 'TicketNo')
    },
  },
  methods: {
    getDescriptionColor(priority){

      if (priority==='High'){
       return  'red'
      }
      if (priority==='Medium'){
        return  'yellow'
      }
      if (priority==='Low'){
        return  'green'
      }

    },
    getColor (ticketstatus) {
      if (ticketstatus==='Assigned'){
        return 'brown'
      }
      if (ticketstatus==='Resolved'){
        return 'green'
      }
      if(ticketstatus==='Received'){

        return 'yellow'
      }
      if (ticketstatus==='Transferred'){
        return  'orange'
      }
    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
  },

  mounted() {
    this.$postRepository.GetTicketInformation.show(this.$auth.$storage.getUniversal('authenticatedUser').sub).then((e)=>{
      this.items=e.result
    });
  }
}
</script>

<style scoped>

</style>
