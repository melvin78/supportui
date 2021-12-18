<template>
  <div>
    <chat-window
      :room-id="GetRoomId"
      @send-message="sendMessageVue"
      :height="'500px'"
      :current-user-id="$auth.$storage.getUniversal('authenticatedUser').sub"
      :rooms="rooms"
      :rooms-loaded="roomsLoaded"
      :loading-rooms="loadingRooms"
      :messages="messages"
      :messages-loaded="messagesLoaded"
      @fetch-messages="fetchMessages"
    />
  </div>
</template>

<script>
import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'
import {mapActions, mapGetters} from "vuex";
import {formatTimestamp, parseTimestamp} from "@/utils/dates";

import Pusher from 'pusher-js';

export default {
  name: "ChatWidget",
  components: {ChatWindow},
  computed: {
    ...mapGetters({
      GetRoomId: 'chatroom/getRoomId',
      GetSocketId:'chatroom/getSocketId'
    })
  },
  data: () => {
    return {
      rooms: [],
      socketId: '',
      files: [],
      random: [],
      Attachment: [],
      roomsLoaded: true,
      messagesLoaded: false,
      loadingRooms: false,
      messages: [],
    }
  },
  created() {
    this.$postRepository.GetChatRooms.show(this.$auth.$storage.getUniversal('authenticatedUser').sub)
      .then((res) => {
        this.rooms = res
      })

    const pusher = new Pusher('07acf5ca1c952ced185b', {
      cluster: 'ap2',
    });

    pusher.connection.bind("connected", () => {

      console.log('original'+pusher.connection.socket_id)
      this.SetSocketId(pusher.connection.socket_id)
      console.log('vuex'+this.GetSocketId)
    })

    const chatWindow = pusher.subscribe(`ticket-${this.GetRoomId}`);

    chatWindow.bind('conversation', (data) => {
     console.log(data)
      // this.messages.push(data)
    });

  },
  methods: {

    ...mapActions({
      SetSocketId: 'chatroom/SetSocketId',
      SetRoomId:'chatroom/SetRoomId'

    }),

    async finalupload() {

      for (let i = 0; i < this.files.length; i++) {
        await this.upload(this.files[i], i)
      }
    },
    async upload(file, i) {
      const aws = require('aws-sdk')


      const spaces = new aws.S3({
        endpoint: 'fra1.digitaloceanspaces.com',
        accessKeyId: '3ZISN34MM5N5CHWJKNDG',
        secretAccessKey: 'E9nKKkt8+pNpmha+fWi47o4pl9y7h+V/I6/oV2PBB+c'
      })


      const params = {
        Bucket: 'centrino-cdn',
        Key: `centrino-cdn/${this.$auth.$storage.getUniversal('authenticatedUser').sub}-${this.random[i]}`,
        Expires: 60 * 3, // Expires in 3 minutes
        ContentType: file.type,
        ACL: 'public-read', // Remove this to make the file private
      }


      await fetch(spaces.getSignedUrl('putObject', params), {
        method: 'PUT',
        body: file.blob,
        headers: {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read',
        }
      })
    },
    formatMessage(room, message) {
      const {timestamp} = message

      const formattedMessage = {
        ...message,
        ...{
          senderId: message.sender_id,
          _id: message.id,
          seconds: timestamp.seconds,
          timestamp: parseTimestamp(timestamp, 'HH:mm'),
          date: parseTimestamp(timestamp, 'DD MMMM YYYY'),
          username: room.users.find(
            user => message.sender_id === user._id
          )?.username,
          // avatar: senderUser ? senderUser.avatar : null,
          distributed: true
        }
      }

      if (message.replyMessage) {
        formattedMessage.replyMessage = {
          ...message.replyMessage,
          ...{
            senderId: message.replyMessage.sender_id
          }
        }
      }

      return formattedMessage
    },

    markMessagesSeen(room, message) {
      if (
        message.data().sender_id !== this.currentUserId &&
        (!message.data().seen || !message.data().seen[this.currentUserId])
      ) {

      }
    },
    listenMessages(messages, room) {
      messages.forEach(message => {
        const formattedMessage = this.formatMessage(room, message)
        const messageIndex = this.messages.findIndex(m => m._id === message.id)

        if (messageIndex === -1) {
          this.messages = this.messages.concat([formattedMessage])
        } else {
          this.messages[messageIndex] = formattedMessage
          this.messages = [...this.messages]
        }

        this.markMessagesSeen(room, message)
      })
    },

    async SubmitMessage(message) {

      const payload = {
        ChatId: message._id,
        InboxId: this.GetRoomId,
        SocketId: this.GetSocketId,
        IndexId: message.indexId,
        Content: message.content,
        SenderId: message.senderId,
        UserName: message.username,
        Avatar: message.avatar,
        Date: message.date,
        TimeStamp: message.timestamp,
        ChatFileUrl: JSON.stringify(message.files)
      }

      this.$postRepository.SendMessage.create(payload).then((res) => {
        console.log(res)
      })
    },

    formatLastMessage(message, room) {
      if (!message.timestamp) return

      let content = message.content
      if (message.files?.length) {
        const file = message.files[0]
        content = `${file.name}.${file.extension || file.type}`
      }

      const username =
        message.sender_id !== this.$auth.$storage.getUniversal('authenticatedUser').sub
          ? room.users.find(user => message.sender_id === user._id)?.username
          : ''

      return {
        ...message,
        ...{
          content,
          timestamp: formatTimestamp(
            new Date(message.timestamp.seconds * 1000),
            message.timestamp
          ),
          username: username,
          distributed: true,
          seen: message.sender_id === this.$auth.$storage.getUniversal('authenticatedUser').sub ? message.seen : null,
          new:
            message.sender_id !== this.$auth.$storage.getUniversal('authenticatedUser').sub &&
            (!message.seen || !message.seen[this.$auth.$storage.getUniversal('authenticatedUser').sub])
        }
      }
    },
    formattedFiles(files) {
      const formattedFiles = []


      files.forEach((file, index) => {
        const messageFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          extension: file.extension || file.type,
          url: `https://centrino-cdn.fra1.digitaloceanspaces.com/centrino-cdn/${this.$auth.$storage.getUniversal('authenticatedUser').sub}-${this.random[index]}` || file.localUrl
        }

        if (file.audio) {
          messageFile.audio = true
          messageFile.duration = file.duration
        }

        formattedFiles.push(messageFile)
      })

      return formattedFiles
    },
    async sendMessageVue({content, roomId, files, replyMessage}) {


      if (files) {
        for (let i = 0; i < files.length; i++) {
          this.random.push(Math.floor(1000 + Math.random() * 9000))
        }

        for (let i = 0; i < files.length; i++) {
          await this.upload(files[i], i)
        }
      }

      const message = {
        id: Math.floor(1000 + Math.random() * 9000),
        sender_id: this.$auth.$storage.getUniversal('authenticatedUser').sub,
        content,
        timestamp: new Date()
      }


      if (files) {
        message.files = this.formattedFiles(files)
      }

      const finalMessage = this.formatMessage(this.rooms.find(x => x.roomId === roomId), message)
      this.messages.push(finalMessage)
      console.log(await this.SubmitMessage(finalMessage))


    },

    fetchMessages({ room, options = {} }) {
      this.$emit('show-demo-options', false)

      // if (options.reset) {
      //   this.resetMessages()
      //   this.roomId = room.roomId
      // }
      //
      // if (this.previousLastLoadedMessage && !this.lastLoadedMessage) {

      // }


      this.SetRoomId(room.roomId)

      this.$postRepository.GetMessages.show(this.GetRoomId).then((res)=>{
        this.messagesLoaded=true
        this.messages=res
      })

    }

  }

}
</script>

<style scoped>

</style>
