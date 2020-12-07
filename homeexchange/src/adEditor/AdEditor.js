import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getAd } from './../shared/redux/ad/adActionCreator';
import AdForm from './../shared/components/adForm/AdForm';
import { updateAd } from './redux/update';
class AdEditor extends PureComponent {
  constructor(props){
    super(props);
    
    this.state = {adId: this.props.match.params.id }
  }
  submitHandler(state){
    this.props.updateAd(state);
    console.log(state);
  }
  componentDidMount() {
    this.props.getAd(this.state.adId);
  }
  
  render() {
    return (
      <div>
        <AdForm onSubmit={this.submitHandler.bind(this)} initialState={this.props.ad}></AdForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ad: state.ads.ad
})

const mapDispatchToProps = {
  getAd,
  updateAd
}

export default connect (mapStateToProps, mapDispatchToProps)(AdEditor)
