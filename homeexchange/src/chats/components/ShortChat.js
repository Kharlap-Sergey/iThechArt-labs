import React from 'react'
function ShortChat({chat}) {
  return (
    <div className="short-chat">
      <div className="short-chat__title">
        {chat.title}
      </div>
      <div className="short-chat__message">
        {chat.message}
      </div>
    </div>
  )
}

export default ShortChat
