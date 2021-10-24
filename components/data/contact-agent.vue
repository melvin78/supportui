<template>
  <div>
    <v-row>
      <v-col md="12">
        <transition-group
          appear
          name="fade-up"
          tag="div"
        >
          <v-data-iterator
            key
            :items="items"
            :items-per-page.sync="itemsPerPage"
            :page="page"
            hide-default-footer
          >
            <template v-slot:default="props">
              <v-row>
                <v-col
                  v-for="(item, index) in props.items"
                  :key="index"
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                >
                  <ListCard
                    :avatar="item.img"
                    :title="item.title"
                    :sub-title="item.subTitle"
                    :email-address="item.emailaddress"
                    button-icon-one="mdi-skype"
                    button-icon-two="mdi-gmail"
                    :progress-linear-color="
                      item.progressLinearColor
                    "
                  />
                </v-col>
              </v-row>
            </template>
            <template v-slot:footer>
              <v-row
                class="mt-2"
                align="center"
                justify="center"
              >
                <v-spacer />


              </v-row>
            </template>
          </v-data-iterator>
        </transition-group>
      </v-col>
    </v-row>
  </div>
</template>
<script>

  import ListCard from "./ListCard";
  export default {
  name:'contact-agent',
    components: {ListCard},
    data () {
      return {
        itemsPerPageArray: [],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 12,
        sortBy: 'name',
        keys: [
          'Name',
          'Calories',
          'Fat',
          'Carbs',
          'Protein',
          'Sodium',
          'Calcium',
          'Iron',
        ],
        items: [
          {
            img: require('~/assets/images/avatars/001-man.svg'),
            title: 'Paul Mungai',
            subTitle: 'Support',
            progressLinearColor: 'primary',
            emailaddress:'paul.mungai@centrino.co.ke',
            skype:'mungai.kamau'
          },

          {
            img: require('~/assets/images/avatars/003-man-1.svg'),
            title: 'Geoffrey Inyunderere',
            subTitle: 'Head Operations',
            progressLinearColor: 'danger',
            emailaddress: 'jeff.inyundere@centrino.co.ke',
            skype: 'jeff.inyundere'
          },
          {
            img: require('~/assets/images/avatars/007-woman-2.svg'),
            title: 'Alice Ngwaci',
            subTitle: 'Support',
            progressLinearColor: 'primary',
            emailaddress: 'alice.ngwaci@centrino.co.ke',
            skype: 'alice.ngwaci'
          },
          {
            img: require('~/assets/images/avatars/003-man-1.svg'),
            title: 'Tobbit Odera',
            subTitle: 'Support',
            progressLinearColor: 'success',
            emailaddress: 'tobbit.odera@centrino.co.ke'
          },
          {
            img: require('~/assets/images/avatars/006-woman-1.svg'),
            title: 'Annie Mbataru',
            subTitle: 'Support',
            progressLinearColor: 'danger',
            emailaddress: 'annie.mbataru@centrino.co.ke'
          },


        ],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter((key) => key !== 'Name')
      },
    },
    methods: {
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
  }
</script>
<style lang="scss">
.fade-up-enter {
    opacity: 0;
    transform: translateY(40px);
}
.fade-up-enter-active {
    transition: all 0.4s ease;
}
</style>
