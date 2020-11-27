import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  getAllAds = () => {
    let url = "https://localhost:44370/Ad/getall";
    async function t() {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      console.log(response);

      if (response.ok) {
        let data = await response.json();    
        console.log(data)
      } else {
        console.log("Status: ", response.status);
        let data = await response.json();
        alert(data.errorText)
      }
    }
    t.call(this);
  }
  render() {
    let ads = this.getAllAds();
    console.log(ads);
    return (
      <div>
        Home Page
        <Link to="/ad/create">create AD</Link>
      </div>
    );
  }
}

export default Home;
