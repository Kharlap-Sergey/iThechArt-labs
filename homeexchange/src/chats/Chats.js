import React, { useState } from "react";
import "./chat.scss";
import ChatsList from "./components/ChatsList";
import Chat from './../chat/Chat';
import { useDispatch } from "react-redux";
import { redirectToAction } from './../shared/redux/redirect/redirectActionCreator';
import { path } from './../shared/utils/path';
import MessageBlock from './components/messageBlock/Chat';
function Chats({ match }) {
  console.log(match);
  const [selectedChatId, setSelectedChatId] = useState(match?.params?.chatId);
  const dispatch = useDispatch();
  const selectChat = (chatId) => {
    if(selectedChatId == chatId) return;
    dispatch(redirectToAction(path.chat(chatId)));
    setSelectedChatId(chatId);
  };
  return (
    <div className="chats">
      <div className="chats__aside">
        <ChatsList selectedChatId ={selectedChatId} handleClick={selectChat}/>
      </div>
      <div className="chats__main">
        {selectedChatId > 0 ? <MessageBlock chatId ={selectedChatId}/> : null}
      </div>
    </div>
  );
}

export default Chats;
