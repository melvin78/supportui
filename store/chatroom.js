
export const state = () => ({

  roomId: '',
  chatHead:'',
  ticketnumber:'',
  dialog:false,
  socketId:'',

})

export const mutations = {

  SET_ROOM_ID:(state,payload)=> state.roomId=payload,
  SET_CHAT_HEAD:(state,payload)=>state.chatHead=payload,
  SET_TICKET_NUMBER:(state)=>state.ticketnumber,
  SET_DIALOG:(state)=>state.dialog=true,
  UNSET_DIALOG:(state)=>state.dialog=false,
  SET_SOCKET_ID:(state,payload)=>state.socketId=payload


}

export const getters = {

  getRoomId: (state) => state.roomId,
  getChatHead:(state)=> state.chatHead,
  getTicketNumber:(state)=> state.ticketnumber,
  getDialog:(state)=>state.dialog,
  getSocketId:(state)=>state.socketId


}

export const  actions ={


  SetRoomId({commit},payload){
    commit('SET_ROOM_ID',payload)
  },
  SetChatHead({commit},payload){
    commit('SET_CHAT_HEAD',payload)
  },
  SetTicketNumber({commit},payload){
    commit('SET_TICKET_NUMBER',payload)
  },
  SetDialog({commit}){
    commit('SET_DIALOG')
  },
  UnsetDialog({commit}){
    commit('UNSET_DIALOG')
  },
  SetSocketId({commit},payload){
    commit('SET_SOCKET_ID',payload)
  },

}
