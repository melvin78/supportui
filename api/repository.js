export default $axios => resource => ({
  all() {
    return $axios.$get(`${resource}`)
  },
  paginate(pageno) {
    return $axios.$get(`${resource}?page=${pageno}`)
  },

mark(){
  return $axios.$post(`${resource}`)
},
  show(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  create(payload) {
    return $axios.$post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.$post(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.$delete(`${resource}/${id}`)
  }
})
