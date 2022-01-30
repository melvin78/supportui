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
          <div class="row sp-details">
            <div v-if="item.resolvedon!==null" class="col-4 mb-2 ">
              <v-subheader>Resolved on</v-subheader>
              {{item.resolvedon}}
            </div>
            <div v-if="item.firstmessage!==null" class="col-4 mb-2">
              <v-subheader>Issue Raised</v-subheader>
              <div v-html="item.firstmessage"></div>
            </div>
            <div v-if="item.caretaker!==null" class="col-4 mb-2">
              <v-subheader>Agent Assigned</v-subheader>
              {{item.caretaker}}
            </div>
            <div v-if="item.attachments.length>0" class="col-4 mb-2 ">
              <v-subheader>Attachments</v-subheader>
              <div v-for="(item,i) in item.attachments">
                <a :href="`https://centrino-cdn.fra1.digitaloceanspaces.com/centrino-cdn/${item.filename}`">attachment {{i+1}}</a>
              </div>
            </div>
            <div v-if="item.dateassigned!==null" class="col-4 mb-2 ">
              <v-subheader>Date Assigned</v-subheader>
              {{item.dateassigned}}
            </div>
          </div>



        </td>

      </template>

    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "ticket-status",
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      singleExpand: true,
      expanded: [],
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'ticketNo',
      headers: [
        {text: 'Ticket Number', value: "ticketnumber"},
        {text: 'Ticket Status', value: "ticketstatus"},
        {text: 'Enquiry Category', value: "enquirycategory"},
        {text: 'Opened On', value: "openedon"},
        {text: 'Priority level', value: "description"},
        {text: 'ViewDetails', value: 'data-table-expand'},

      ],
      items: [],
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {

      return this.keys.filter(key => key !== 'TicketNo')
    },
  },
  methods: {
    getDescriptionColor(priority) {

      if (priority === 'High') {
        return '#EF5350'
      }
      if (priority === 'Medium') {
        return '#DCE775'
      }
      if (priority === 'Low') {
        return '#C5E1A5'
      }

    },
    getColor(ticketstatus) {
      if (ticketstatus === 'Assigned') {
        return 'brown'
      }
      if (ticketstatus === 'Resolved') {
        return 'green'
      }
      if (ticketstatus === 'Received') {

        return '#FFEE58'
      }
      if (ticketstatus === 'Transferred') {
        return 'orange'
      }
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
  },

  mounted() {
    this.$postRepository.GetTicketInformation.show(this.$auth.$storage.getUniversal('authenticatedUser').sub).then((e) => {
      this.items = e.result
    });
  }
}
</script>

<style scoped>

</style>
