
export const state = () => ({

  error: ''
})

export const mutations = {

  SET_ERROR: (state, payload) => (state.error = payload)

}

export const getters = {

  getError: (state) => state.error
}

export const  actions ={



}
