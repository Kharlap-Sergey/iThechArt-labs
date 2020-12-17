import React, { useState } from "react";
import "./chat.scss";
import ChatsList from "./components/ChatsList";
import Chat from './../chat/Chat';
function Chats({ match }) {
  console.log(match);
  const [selectedChatId, setSelectedChatId] = useState(match?.params?.chatId);
  const selectChat = (chatId) => {
    setSelectedChatId(chatId);
  };
  return (
    <div className="chats">
      <div className="chats__aside">
        <ChatsList />
      </div>
      <div className="chats__main">
        {selectedChatId > 0 ? <Chat chatId ={ selectedChatId}/> : null}
      </div>
    </div>
  );
}

export default Chats;
