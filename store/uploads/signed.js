
export const state = () => ({

  url:''


})

export const mutations = {

  SET_URL: (state, payload) => (state.url = payload),


}

export const getters = {

  getUrl: (state) => state.url,

}

export const  actions ={

  async getUrl({commit},payload) {


      commit('SET_URL', payload)

  },



}
