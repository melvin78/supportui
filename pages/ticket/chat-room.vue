<template>
  <v-row justify="center">


    <v-dialog
      v-model="GetDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="UnsetDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>You are chatting with {{GetCustomerName}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>

          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <ChatWidget/>

        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ChatWidget from "@/components/ChatWidget";
export default {
  name: "chat-room",
  components:{ChatWidget}
}
</script>

<style scoped>

</style>
