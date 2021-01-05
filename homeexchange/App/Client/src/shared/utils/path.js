const api = "https://localhost:44370";
export const path = {
  home: "/",
  sign: {
    to: "/sign/:type",
    login: "/sign/login",
    registration: "/sign/registration",
  },
  chat: (cahtId) => `/chat/id${cahtId ?? ":chatId"}`,
  ad: {
    to: (id) => `/ad/id${id ?? ":id"}`,
    edit: (id) => `/ad/edite/${id ?? ":id"}`,
    create: () => "/ad/create",
  },
  profile: {
    edit: (id) => `/profile/edit/id${id ?? ":id"}`,
    to: (id) => `/profile/id${id ?? ":id"}`,
  },
};

export const pathApi = {
  img: {
    send: () => api + "/img/addFile",
    get: (targetUserId) => api + `/img/get/${targetUserId}`,
  },
  profileRating: {
    get: (id) => api + `/rating/get/${id}`,
    set: () => api + "/rating/set",
  },
  notifications: {
    get: api + "/notification/getNotifications",
    delete: (id) => api + `/notification/deleteNotificaton/${id}`,
  },
  account: {
    update: api + "/account/update",
    registrate: api + "/account/registrate",
    login: api + "/account/login",
    reenter: api + "/account/get",
    get: (id) => api + `/account/get/${id}`,
  },

  chat: {
    loadChatList: api + "/chat/getChatList",
    loadChatId: api + "/chat/getPrivateRoomId",
    loadChatMessages: api + "/chat/getChatMessages",
  },

  ad: {
    create: api + "/ad/create",
    loadPage: () => api + `/ad/getadspage`,
    update: () => api + `/ad/update`,
    get: (adId) => api + `/ad/get/${adId}`,
    delete: (adId) => api + `/ad/delete/${adId}`,
    replyOnAd: (adId) => api + `/ad/reply/${adId}`,
  },
};

export const pathHub = {
  chat: api + "/hub/chat",
  notification: api + "/hub/notification",
};
