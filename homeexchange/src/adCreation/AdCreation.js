import React, { PureComponent } from "react";
import AdForm from "../shared/components/adForm/AdForm";
import { createNewAd } from "../shared/redux/ad/adActionCreator";
import { connect } from 'react-redux';

class AdCreation extends PureComponent {
  submitHandler(state){
    console.log(state);
    this.props.createNewAd(state);
  }
  render() {
    return (
      <div>
        <AdForm onSubmit={this.submitHandler.bind(this)} ></AdForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  createNewAd
}

export default connect(mapStateToProps, mapDispatchToProps)(AdCreation);
