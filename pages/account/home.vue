<template>
  <div>
  <div class="text-center">Hello,{{this.$auth.$storage.getUniversal('authenticatedUser').preferred_username}}</div>
    <v-divider/>
<ContentCard />
    <v-divider/>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import ContentCard from "../../components/data/ContentCard";
export default {
  name: "home",
  layout:"main",
  components: {ContentCard},
  middleware:'rolecheck',

  data(){

    return{
    user:null
    }
  },

  computed:{

    ...mapGetters({
      getAuthenticatedUser: 'user/USER_DATA'
    })
  },
  mounted() {
    this.user= this.$auth.$storage.getUniversal('authenticatedUser')
    console.log(this.$auth.user)
  }

}
</script>

<style scoped>

</style>
