export const state = () => ({

  TicketBeingViewed: null,
  SocketId:null,
  Chats:[],


})

export const mutations = {

  SET_TICKET_BEING_VIEWED: (state, payload) => (state.TicketBeingViewed = payload),
  SET_SOCKET_ID:(state,payload)=>(state.SocketId=payload),
  SET_CHATS:(state,payload)=>(state.Chats.push(payload))


}

export const getters = {

  getTicketBeingViewed: (state) => state.TicketBeingViewed,
  getSocketId:(state)=> state.SocketId,
  getChats:(state)=>state.Chats
}

export const actions = {

  async SaveTicketBeingViewed({commit}, payload) {
    commit('SET_TICKET_BEING_VIEWED', payload)
  },

  async SetSocketId({commit},payload){
    commit('SET_SOCKET_ID',payload)
  },

  async SetChats({commit},payload){
    commit('SET_CHATS',payload)
  }




}
