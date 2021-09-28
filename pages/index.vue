<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
<v-img max-width="250" max-height="250" src="/supportlogo.png"></v-img>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Welcome to Centrino Ticket Supporting System
        </v-card-title>
        <v-card-text>
          <p>In order to streamline support requests and better serve you, we utilise a support Ticket system
          Every support request is assigned a unique ticket number which you can use to track the progress and
          responses online.For your reference we provide complete archives and history of all your support requests.
          A valid email address is required to submit a ticket</p>



          <hr class="my-3">
           <div class="d-flex justify-space-between">
             <v-btn
             @click="login"
             >
               Sign In To Create A new Ticket
             </v-btn>


           </div>

        </v-card-text>
        <v-card-actions>

        </v-card-actions>
      </v-card>
    </v-col>

  </v-row>
</template>
<script>
import {UserManager} from 'oidc-client';
export default {

  name: "index",
  layout: "normal",
  data(){
    return{
      userMgr:null,


    }
  },


  methods:{
    login(){
      return this.userMgr.signinRedirect()


    },

    logOut(){
      this.userMgr.signoutRedirect()
    },
    checkUser(){
      this.userMgr.getUser().then((user)=>{
        console.log(user)
      })
    }



  },
  created() {
    this.userMgr=new UserManager({
      authority:'https://localhost:5001',
      client_id:'js',
      redirect_uri:'http://localhost:3000/account/callback',
      response_type:"code",
      scope:"openid profile enquiries.read enquiries.write",
      post_logout_redirect_uri:"http://localhost:3000"

    })

  }
}

</script>
