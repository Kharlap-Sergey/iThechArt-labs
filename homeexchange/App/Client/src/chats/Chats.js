import React, { useState } from "react";
import "./chat.scss";
import ChatsList from "./components/chatsList/ChatsList";
import { useDispatch } from "react-redux";
import { redirectToAction } from "../shared/redux/redirect/actions";
import { path } from "./../shared/utils/path";
import MessageBox from "./components/messageBox/MessageBox";
import bgImg from "../shared/imgs/chat.svg";
function Chats({ match }) {
  const [selectedChatId, setSelectedChatId] = useState(+match?.params?.chatId);
  const dispatch = useDispatch();
  const selectChat = (chatId) => {
    if (selectedChatId === chatId) return;
    dispatch(redirectToAction(path.chat(chatId)));
    setSelectedChatId(chatId);
  };
  return (
    <div className="chats">
      <div className="chats__aside">
        <ChatsList selectedChatId={selectedChatId} handleClick={selectChat} />
      </div>
      <div className="chats__main">
        <div className="chats__bg-img-wrappper">
          <img src={bgImg} alt="" className="chats__bg-img" />
        </div>
        {selectedChatId > 0 ? <MessageBox chatId={selectedChatId} /> : null}
      </div>
    </div>
  );
}

export default Chats;
