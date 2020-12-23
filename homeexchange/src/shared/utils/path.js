const api = "https://localhost:44370";
export const path = {
  home: "/",
  login: "/sign",
  sign: "/sign",
  registration: "/registration",

  chat: (cahtId) => `/chat/id${cahtId ?? ":chatId"}`,
  chatList: "/chats",
  ad: (id) => `/ad/id${id ?? ":id"}`,
  profile: {
    edit: (id) => `/profile/edit/id${id ?? ":id"}`,
    to: (id) => `/profile/id${id ?? ":id"}`,
  },
  adapi: {
    ad: api + "/ad",
    update: api + "/ad/update",
    create: "",
  },
  accocunt: {
    account: api + "/account",
    login: api + "/account/login",
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
    delete: (id) => {
      return api + `/notification/deleteNotificaton/${id}`;
    },
  },
  account: {
    update: api + "account/update",
    registrate: api + "/account/registrate",
    login: api + "/account/login",
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
