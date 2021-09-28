export default function({ store, redirect }) {
  if(!store.$auth.$storage.getLocalStorage('isLoggedin')){
  return redirect('/account/session-expired')
  }


}
