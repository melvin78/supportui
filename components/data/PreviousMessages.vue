<template>
  <v-expansion-panels  popout>
    <v-expansion-panel
      v-for="(item,i) in 1"
      :key="i"
    >
      <v-expansion-panel-header>
       See Previous Chat History
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <testchat/>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import DataTable from "./DataTable";
import Testchat from "./chat";
export default {
  name: "PreviousMessages",
  components: {Testchat, DataTable}
}
</script>

<style scoped>

</style>
