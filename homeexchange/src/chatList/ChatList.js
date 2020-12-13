import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import { path } from "../shared/utils/path";
import { loadChatList } from "./../shared/redux/chat/chat";
import "./chat-list.scss";
class ChatList extends PureComponent {
  componentDidMount() {
    this.props.loadChatList();
  }

  handleChatClick(event, id) {
    console.log('id', id);
    this.props.redirectToAction(path.chat + `/id${id}`)
  }
  render() {
    console.log('', this.props.chats)
    return <ul className="chat-list">
      {this.props.chats.map(chat =>
        (<li className="chat-list__item" key={chat.id}>
          <button onClick={this.handleChatClick.bind(this, null, chat.id)}>{chat.title}</button>
        </li>))}
    </ul>;
  }
}

const mapStateToProps = (state) => ({
  chats: state.chat.chats
});


const mapDispatchToProps = { loadChatList, redirectToAction };
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
