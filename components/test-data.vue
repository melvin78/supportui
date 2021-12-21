<template>
  <v-data-table
    class="fb-table-elem"
                :headers="headers"
                :items="items"
                hide-actions
                item-key="name"
                expand
  >
    <tbody>
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td><div class="datatable-cell-wrapper">{{ props.item.name }}</div></td>
        <td class="text-xs-right"><div class="datatable-cell-wrapper">{{ props.item.calories }}</div></td>
        <td class="text-xs-right"><div class="datatable-cell-wrapper">{{ props.item.fat }}</div></td>
        <td class="text-xs-right"><div class="datatable-cell-wrapper">{{ props.item.carbs }}</div></td>
        <td class="text-xs-right"><div class="datatable-cell-wrapper">{{ props.item.protein }}</div></td>
        <td class="text-xs-right"><div class="datatable-cell-wrapper">{{ props.item.sodium }}</div></td>
        <td class="text-xs-right"><div class="datatable-cell-wrapper">{{ props.item.calcium }}</div></td>
        <td class="text-xs-right"><div class="datatable-cell-wrapper">{{ props.item.iron }}</div></td>
      </tr>
    </template>
    </tbody>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </v-card-text>
        <v-card-text>Peek-a-boo!</v-card-text>
        <div class="datatable-container"></div>
      </v-card>

    </template>

  </v-data-table>



</template>

<script>
export default {
  name: "test-data",
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
        return 'red'
      }
      if (priority === 'Medium') {
        return 'yellow'
      }
      if (priority === 'Low') {
        return 'green'
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

        return 'yellow'
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

<style scoped lang="css">
table.table {
  margin:0 auto;
  width: 98%;
  max-width: 98%;
}

.datatable-cell-wrapper {
  width: inherit;
  position: relative;
  z-index: 4;
  padding: 10px 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.datatable__expand-content .card__text {
  z-index: 3;
  position: relative;
}
.datatable-container {
  position: absolute;
  background-color: white;
  top: -50px;
  left: -14px;
  right: -14px;
  bottom: 0;
  z-index: 2;
  border:1px solid #ccc;
  box-shadow: 0 4px 5px 0 rgba(0,0,0,0.15), 0 1px 10px 0 rgba(0,0,0,0.15), 0 2px 4px -1px rgba(0,0,0,0.2);
}
</style>
