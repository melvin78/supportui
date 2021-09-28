export default function authHandler({$axios, store}) {

  $axios.interceptors.response.use(function (response) {


      return response;
    },
    function (error) {

      if (error.response.status === 422) {
        store.commit('errorhandler/SET_ERROR', error.response.data)

      }
      return Promise.reject(error);
    });

  $axios.onRequest(config => {
    config.headers.common['Authorization'] = `Bearer ${store.$auth.$storage.getUniversal('accesstoken')}`;
  });
  // $auth.onError(error => {
  //   if (error.response.status === 422) {
  //     store.commit('errorhandler/SET_ERROR', error.response.data)
  //   }
  // })
}
