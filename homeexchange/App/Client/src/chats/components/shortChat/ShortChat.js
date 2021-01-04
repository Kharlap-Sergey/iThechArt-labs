import React from "react";
import { trimText } from "shared/utils/trimmer";
import "./short-chat.scss";
import PropTypes from 'prop-types';

function ShortChat({ chat }) {
  return (
    <div className="short-chat">
      <div className="short-chat__title">{chat.title}</div>
      <div className="short-chat__message">
        {trimText(chat.message?.content)}
      </div>
    </div>
  );
}

ShortChat.propTypes = {
  chat: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.object.isRequired,
  }),
}
export default ShortChat;
