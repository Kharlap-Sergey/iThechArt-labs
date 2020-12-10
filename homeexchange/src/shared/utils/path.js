const api = "https://localhost:44370"
export const path = {
  home: "/",

  // ../caht/id:chatId
  chat: "/chat",

  ad: {
    ad: api+"/ad",
    update: api+"/ad/update",
    create: ""
  },
  accocunt: {
    account: api+"/account",
    login: api+"/account/login",
  }
}

export const pathApi = {
  notifications: {
    get: api + "/notification/getNotifications"
  },

  account: {
    registrate: api + "/account/registrate",
    login: api+"/account/login"
  },

  chat: {
    loadChatList: api + "chat/getChatList"
  }
}