import Vue from 'vue'

import vue_pusher from "vue-pusher";

Vue.use(vue_pusher, {
  api_key: '07acf5ca1c952ced185b',
  options: {
    cluster: 'ap2',
    encrypted: true,
  }
});
