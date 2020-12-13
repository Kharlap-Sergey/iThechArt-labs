const api = "https://localhost:44370"
export const path = {
  home: "/",
  login: '/login',
  registration: "/registration",
  /// ../chat/id:chatId
  chat: "/chat",
  chatList: "/chatlist",
  ad: (id) => `/ad/id${id ?? ":id"}`,
  adapi: {
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
    get: api + "/notification/getNotifications",
    delete: (id) => {
      return api + `/notification/deleteNotificaton/${id}`;
    }
  },

  account: {
    registrate: api + "/account/registrate",
    login: api + "/account/login"
  },

  chat: {
    loadChatList: api + "/chat/getChatList",
    loadChatId: api + "/chat/getPrivateRoomId",
    loadChatMessages: api + "/chat/getChatMessages"
  },

  ad: {
    loadPage: (page, userId) => api + `/ad/getadspage/${page}/${userId ?? ""}`,
  },
}

export const pathHub = {
  chat: api + "/hub/chat",
}