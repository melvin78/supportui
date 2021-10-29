<template>
  <div>
  <div class="text-center">Hello,{{this.$auth.$storage.getUniversal('authenticatedUser').first_name}}</div>
    <div class=" mt-3 text-center d-flex flex justify-center pb-3">
      <v-btn @click="logOutIdentityServer" color="orange" large >LOG OUT</v-btn>
    </div>
    <v-divider/>
<ContentCard />
    <v-divider/>
    <hr class="my-3"/>

  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {UserManager} from 'oidc-client';
import ContentCard from "../../components/data/ContentCard";
export default {
  name: "home",
  layout:"main",
  components: {ContentCard},
  middleware:'rolecheck',

  data(){

    return{
    user:null,
    UserMgr:null,
    }
  },
  methods:{

    logOutIdentityServer(){
      this.UserMgr.signoutRedirect();
      this.$auth.$storage.removeUniversal('testprofile')
      this.$auth.$storage.removeUniversal('authenticatedUser')
      this.$auth.$storage.removeUniversal('accesstoken')
      this.$auth.$storage.setLocalStorage('isLoggedin',false)

    }


  },

  computed:{

    ...mapGetters({
      getAuthenticatedUser: 'user/USER_DATA'
    })
  },
  mounted() {
    this.user= this.$auth.$storage.getUniversal('authenticatedUser')

    this.UserMgr=new UserManager({
      authority:'https://identity-server.centrino.caprover.centrino.co.ke',
      client_id:'js',
      redirect_uri:'https://helpdesk.centrino.co.ke/account/callback',
      response_type:"code",
      scope:"openid profile enquiries.read enquiries.write",
      post_logout_redirect_uri:"https://helpdesk.centrino.co.ke"

    })

  }

}
</script>

<style scoped>

</style>
