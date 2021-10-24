export const state = () => ({


  FirstMessage: '',
  Response:[],



})

export const mutations = {


  SET_FIRST_MESSAGE: (state, payload) => (state.FirstMessage = payload),
  SET_RESPONSE:(state,payload) => (state.Response.push(payload)),
  REMOVE_RESPONSE:(state,payload)=>(state.Response.splice(payload,1))



}

export const getters = {

 GET_FIRST_MESSAGE: (state) => state.FirstMessage,
 GET_RESPONSE:(state)=>state.Response


}


export const actions = {

  async GetFirstMessage({commit},urlparam) {
    this.$postRepository.GetFirstMessage.show(`${urlparam}`).then((response)=>{
      commit('SET_FIRST_MESSAGE',response)
    })
  },
  async SetResponse ({commit},response) {

      commit('SET_RESPONSE', response)
  },

  async ClearNotification({commit},response){

    commit('REMOVE_RESPONSE',response)
  }


}



