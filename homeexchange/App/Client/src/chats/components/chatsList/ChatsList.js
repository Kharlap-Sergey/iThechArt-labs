import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { loadChatList } from "shared/redux/chat/thunkActions";
import { clearChatAction } from "shared/redux/chat/actions";
import { selectChatsList } from "shared/redux/chat/selectors";
import ShortChat from "../shortChat/ShortChat";
import "./chat-list.scss";

function ChatsList({ selectedChatId, handleClick }) {
  const dispatch = useDispatch();

  const chats = useSelector((state) => selectChatsList(state));

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
    return res.sort(
      (b, a) =>
        new Date(a.message?.publicationDate) -
        new Date(b.message?.publicationDate)
    );
  };

  const chatList = ownmap(chats).map((chat) => (
    <li
      key={chat.id}
      onClick={(e) => {
        handleClick(chat.id, e);
      }}
      className={`chat-list__item ${
        selectedChatId === chat.id ? "chat-list__item--selected" : ""
      }`}
    >
      <ShortChat chat={chat} />
    </li>
  ));
  return <ul className="chat-list">{chatList}</ul>;
}

ChatsList.propTypes = {
  selectedChatId: PropTypes.number,
};
export default ChatsList;
