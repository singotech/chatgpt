<template>
  <q-page ref="pageChat">
    <div class="q-pa-lg row justify-center">
      <div style="width: 100%">
        <div v-for="chat in chats" :key="chat.from">
          <div v-if="chat.from === 'chatgpt'">
            <q-chat-message
              :name=chat.from
              avatar="https://cdn-icons-png.flaticon.com/64/9108/9108014.png"
              :text="chat.text"
              text-color="grey-1"
              bg-color="grey-7"
              text-html
              stamp="👍 &nbsp&nbsp&nbsp&nbsp&nbsp 👎"
            />
          </div>
          <div v-else>
            <q-chat-message
              :name=chat.from
              avatar="https://cdn-icons-png.flaticon.com/64/906/906265.png"
              :text="chat.text"
              text-color="grey-1"
              bg-color="grey-9"
              sent
              text-html
            />
          </div>
        </div>
      </div>
    </div>
  </q-page> 
  <q-footer class="bg-black">
    <div class="q-pa-sm" style="width: 100%" :key="renderKey">
      <q-input ref="chat_user" square outlined autogrow v-model="chat_user">
        <template v-slot:append>
          <q-btn round dense flat icon="send" @click="addChatUser()" />
        </template>
      </q-input>
    </div>
  </q-footer>
</template>


<script>
import { defineComponent } from 'vue'
import { LocalStorage } from 'quasar'
import utilFunc from '../utils/mylib'

utilFunc.foo()

export default defineComponent({
  name: 'IndexPage',
  methods: {
    addChatUser() {
      if (this.chat_user === '') {
        return
      }
      let answerCount = LocalStorage.getItem("answerCount") + 1
      LocalStorage.set("answerCount", answerCount)

      let chatUser = this.chat_user.replace(/\n/g, '<br>')
      this.chats.push({
        from: 'me',
        text: [chatUser]
      })

      this.clearMessage()
      this.scrollToBottom()

      // delay 1 - 5 second
      let min = 500
      let max = 2500
      let delay = Math.floor(Math.random() * (max - min + 1) + min)
      setTimeout(() => this.getNextAnswer(answerCount), delay)
    },

    getNextAnswer(prevAnswer) {
      utilFunc.googleAnswerAdapter("getNextAnswer", this.answerID, prevAnswer).then(result => {
        if (result.rc == 200) {
          let reply = result.data.msg.replace(/\n/g, '<br>')
          this.chats.push({
            from: 'chatgpt',
            text: [reply]
          })

          this.scrollToBottom()
        }
      })
    },

    reRender() {
       this.renderKey++
    },

    clearMessage() {
      this.chat_user = ''
      this.$refs.chat_user.blur()
    },

    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight)
      }, 20)
    }
  },
  created() {
    utilFunc.googleAnswerAdapter("getAnswerID").then(result => {
      if (result.rc == 200) {
        this.answerID = result.data.id
      }
    })
    LocalStorage.set("answerCount", -1)
  },
  data() {
    return {
      answerID: 1,
      chat_user: '',
      renderKey: 0,
      chats: [
        // {
        //   from: 'me',
        //   text: [`<img src="https://media.tenor.com/jb56fVPgnpkAAAAM/busy-cats.gif" width="250"/>`]
        // },
        // {
        //   from: 'chatgpt',
        //   text: ['sample answer']
        // }
      ]
    }
  }
})
</script>


