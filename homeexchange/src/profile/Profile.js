import React, { Component } from 'react';
import {redirectToAction} from '../shared/redux/redirect/redirectActionCreator';

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount(){
  
  }

  render() {
    return (
      <div className="profile profile__body">
        <div className="profile__inf">
          <div className="profile__avatar"></div>
          <div className="profile__information"></div>
          <div className="profile__editor"></div>
        </div>
        <div className="profile__ads"></div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  redirectToAction,
}
export default Profile;
