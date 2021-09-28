<template>
<div class="text-h3">Session expired you will now be redirected to the home page in order to login once more</div>
</template>

<script>
export default {
  name: "session-expired",

  mounted() {

    setTimeout(()=>{
      window.location.href='/'
    },5000)
  }
}
</script>

<style scoped>

</style>
