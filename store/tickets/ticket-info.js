export const state = () => ({

  TicketNo: null,
  UserName: null,

})

export const mutations = {

  SET_TICKETNO: (state, payload) => (state.TicketNo = payload),
  SET_USERNAME: (state, payload) => (state.UserName = payload),

}

export const getters = {

  getTicketno: (state) => state.TicketNo,
  getUsername: (state) => state.UserName
}

export const actions = {

  async SaveTicketNo({commit}, payload) {
    commit('SET_TICKETNO', payload)
  },

  async SaveUsername({commit}, payload) {

    commit('SET_USERNAME', payload)
  },



}
