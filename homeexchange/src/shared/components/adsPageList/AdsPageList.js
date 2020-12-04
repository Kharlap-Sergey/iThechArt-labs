import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ShordAd from '../shortAd/ShordAd';
import { getAds } from './redux/adsPageListActionCreatior';

class AdsPageList extends PureComponent {
  componentDidMount(){
    this.props.getAds(8);
  }
  render() {
    console.log(this.props)
    const ads = this.props.ads;
    return (
      <div>
        {ads.map((ad) => {
          return (<ShordAd title={ad.title}/>)
        } )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  console.log(state);
  return {...state.adsPageList}
}
const mapDispatchToProps = {
  getAds
}
export default connect(mapStateToProps, mapDispatchToProps)(AdsPageList);
