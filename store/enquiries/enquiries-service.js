
export const state = () => ({

  Enquiry:[],
  EnquiryCategory:[]

})

export const mutations = {

  SET_ENQUIRY: (state, payload) => (state.Enquiry = payload),
  SET_ENQUIRY_CATEGORY: (state, payload) => (state.EnquiryCategory = payload)

}

export const getters = {

  getEnquiry: (state) => state.Enquiry,
  getEnquiryCategory: (state)=>state.EnquiryCategory

}

export const  actions ={

  async getEnquiries({commit}) {
    await this.$postRepository.GetEnquiries.all().then((response) => {

      commit('SET_ENQUIRY', response)
    })
  },

  async getEnquiriesCategory({commit},urlparam) {
    await this.$postRepository.GetEnquiryCategory.show(`${urlparam}`).then((response) => {

      commit('SET_ENQUIRY_CATEGORY', response)
    })
  },

}
