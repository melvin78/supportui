
export const state = () => ({

  TicketNo:null
})

export const mutations = {

  SET_TICKETNO: (state, payload) => (state.TicketNo = payload)

}

export const getters = {

  getTicketno: (state) => state.TicketNo
}

export const  actions ={

 async saveEnquiry({commit},payload) {
  await this.$postRepository.SaveTicketInformation.create(payload).then((response) => {

    commit('SET_TICKETNO', response)
  })
},

}
