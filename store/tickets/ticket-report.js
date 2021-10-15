export const state = () => ({

  TicketReportsByUserId: [],
  TicketReportsByTicketNo:[],


})

export const mutations = {

  SET_TICKETREPORT: (state, payload) => (state.TicketReportsByUserId = payload),
  SET_TICKETREPORT_BY_TICKET_NO: (state, payload) => (state.TicketReportsByTicketNo = payload),


}

export const getters = {

  getTicketreports: (state) => state.TicketReportsByUserId,
  getTicketReportsByTicketNo: (state)=> state.TicketReportsByTicketNo,
}

export const actions = {

  async fetchTicketReportsByUserId({commit},urlparam) {
    await this.$postRepository.GetTicketReportsByUser.show(`${urlparam}`).then((response) => {

      commit('SET_TICKETREPORT', response)
    })

  },
  async fetchTicketReportsByTicketNo({commit},urlparam) {
    await this.$postRepository.GetTicketReportsByTicketNo.show(`${urlparam}`).then((response) => {

      commit('SET_TICKETREPORT_BY_TICKET_NO', response)
    })

  },


}
