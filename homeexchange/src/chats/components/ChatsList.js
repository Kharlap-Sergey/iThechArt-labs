import { useDispatch, useSelector } from "react-redux";
import { loadChatList } from "./../../shared/redux/chat/chat";
import ShortChat from "./ShortChat";
import { clearChatAction } from "./../../shared/redux/chat/chatActionCreator";
import React, { useEffect } from "react";

function ChatsList({ selectedChatId, handleClick }) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  useEffect(() => {
    dispatch(loadChatList());
    return () => {
      dispatch(clearChatAction());
    };
  }, []);

  const ownmap = (obj) => {
    const res = [];
    for (let elm in obj) {
      res.push(obj[elm]);
    }
    console.log('res', res)
    return res.sort((b, a) => new Date(a.message?.publicationDate) - new Date(b.message?.publicationDate));
  };
  return (
    <ul className="chat-list">
      {ownmap(chats).map((chat) => (
        <li key={chat.id}
          onClick={(e) => { handleClick(chat.id, e) }}
          className={`chat-list__item ${selectedChatId == chat.id ? "chat-list__item--selected" : ""
            }`}
        >
          <ShortChat chat={chat} />
        </li>
      ))}
    </ul>
  );
}

export default ChatsList