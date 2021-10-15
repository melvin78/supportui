export const state = () => ({

  TicketBeingViewed: null,


})

export const mutations = {

  SET_TICKET_BEING_VIEWED: (state, payload) => (state.TicketBeingViewed = payload),


}

export const getters = {

  getTicketBeingViewed: (state) => state.TicketBeingViewed,
}

export const actions = {

  async SaveTicketBeingViewed({commit}, payload) {
    commit('SET_TICKET_BEING_VIEWED', payload)
  },




}
