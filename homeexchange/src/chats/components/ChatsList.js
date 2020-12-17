import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadChatList } from './../../shared/redux/chat/chat';
function ChatsList() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadChatList());
    return () => {
    }
  })
  const chats = useSelector(state => state.chat.chats);
  return (
    <ul>
      {chats.map(chat => <li>{chat.title}</li>)}
    </ul>
  )
}

export default ChatsList
