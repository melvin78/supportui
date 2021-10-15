<template>
  <div class="text-h2">You will be redirected in a few seconds....</div>

</template>

<script>
import {UserManager} from "oidc-client";
import {mapActions} from 'vuex'

export default {
  name: "callback",
  layout: "other",
  data() {
    return {
      usrManager: null
    }
  },
  methods: {
    ...mapActions({
      SetUser:'user/setUser'
    })
  },

  mounted() {
    this.usrManager = new UserManager({
      response_mode: "query"
    }).signinRedirectCallback()
      .then((user) => {
        this.$auth.$storage.setUniversal('testprofile',user)
        this.$auth.$storage.setUniversal('authenticatedUser',user.profile)
        this.$auth.$storage.setUniversal('accesstoken',user.access_token)
        this.$auth.$storage.setLocalStorage('isLoggedin',true)
          this.$router.push('/account/home')
      })


  }
}
</script>

<style scoped>

</style>
