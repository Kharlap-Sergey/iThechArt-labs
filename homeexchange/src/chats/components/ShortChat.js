import React from "react";
function ShortChat({ chat }) {
  console.log("chat", chat);
  return (
    <div className="short-chat">
      <div className="short-chat__title">{chat.title}</div>
      <div className="short-chat__message">
        {chat.message?.content.length > 30
          ? chat.message?.content.slice(0, 30) + "..."
          : chat.message?.content}
      </div>
    </div>
  );
}

export default ShortChat;
