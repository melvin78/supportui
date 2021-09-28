

export const state = () => ({


user:null,
authenticated:false,
  userManager:null

})

export const mutations = {


  SET_USER: (state,payload) => (state.user = payload),
  SET_AUTHENTICATED:(state)=>(state.authenticated=true),
  SET_USER_MANAGER:(state,payload)=>(state.userManager= payload)



}

export const getters = {

  USER_DATA: (state) => state.user,
  GET_USER_MANAGER: (state)=>state.userManager


}



export const actions = {




  async setUser({commit}, payload) {


    commit('SET_USER', payload)
    commit('SET_AUTHENTICATED')

  },

  async setUserManager({commit},payload){

    commit('SET_USER_MANAGER',payload)
  }




}



