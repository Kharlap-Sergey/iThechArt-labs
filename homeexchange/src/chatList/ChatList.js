import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { redirectToAction } from "../shared/redux/redirect/redirectActionCreator";
import { path } from "../shared/utils/path";
import { loadChatList } from "./../shared/redux/chat/chat";

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
    return <div style={{ color: "white" }}>
      {this.props.chats.map(chat =>
        <button onClick={this.handleChatClick.bind(this,null, chat.id)}>{chat.title}</button>)}
    </div>;
  }
}

const mapStateToProps = (state) => ({
  chats: state.chat.chats
});


const mapDispatchToProps = { loadChatList, redirectToAction };
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
