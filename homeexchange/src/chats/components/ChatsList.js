import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadChatList } from "./../../shared/redux/chat/chat";
import ShortChat from "./ShortChat";
import { clearChatAction } from './../../shared/redux/chat/chatActionCreator';
function ChatsList({ selectedChatId, handleClick}) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);

  useEffect(() => {
    dispatch(loadChatList());
    return () => {dispatch(clearChatAction())};
  }, []);

  return (
    <ul className="chat-list" onCl>
      {chats.map((chat) => (
        <li
          onClick={(e) => {handleClick(chat.id, e)}}
          className={`chat-list__item ${
            selectedChatId == chat.id ? "chat-list__item--selected" : ""
          }`}
        >
          <ShortChat chat={chat} />
        </li>
      ))}
    </ul>
  );
}

export default ChatsList;
