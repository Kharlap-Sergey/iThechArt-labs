import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Ad from '../components/Ad/Ad';

class Home extends Component {
  state={}
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
        this.setState(data);
      } else {
        console.log("Status: ", response.status);
        let data = await response.json();
        alert(data.errorText)
      }
    }
    t.call(this);
  }

  render() {
    // this.getAllAds();
    // console.log(ads);
  //   <ul>
  //   {ads.map((ad, index) => <Ad key={index} props={} />)}
  // </ul>
    return (
      <div>
       
        <Link to="/ad/create">create AD</Link>
      </div>
    );
  }
}

export default Home;
