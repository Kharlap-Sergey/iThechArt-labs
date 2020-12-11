const api = "https://localhost:44370"
export const path = {
  home: "/",

  /// ../chat/id:chatId
  chat: "/chat",

  chatList: "/chatlist",

  ad: {
    ad: api + "/ad",
    update: api + "/ad/update",
    create: ""
  },
  accocunt: {
    account: api + "/account",
    login: api + "/account/login",
  }
}

export const pathApi = {
  notifications: {
    get: api + "/notification/getNotifications"
  },

  account: {
    registrate: api + "/account/registrate",
    login: api + "/account/login"
  },

  chat: {
    loadChatList: api + "/chat/getChatList",
    loadChatId: api + "/chat/getPrivateRoomId",
    loadChatMessages: api + "/chat/getChatMessages"
  }
}

export const pathHub = {
  chat: api + "/hub/chat",
}