import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { loadChatList } from "./../shared/redux/chat/chat";

class ChatList extends PureComponent {
  componentDidMount() {
    this.props.loadChatList();
  }
  render() {
    return <div style={{color: "white"}}>
      chat list
    </div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { loadChatList };

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
