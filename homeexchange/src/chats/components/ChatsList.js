import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadChatList } from "./../../shared/redux/chat/chat";
import ShortChat from "./ShortChat";
function ChatsList({ selectedChatId, handleClick}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChatList());
    return () => {};
  });
  const chats = useSelector((state) => state.chat.chats);
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
