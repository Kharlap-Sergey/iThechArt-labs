import React, { PureComponent } from 'react'
import AdsPageList from '../shared/components/adsPageList/AdsPageList'
import { connect } from 'react-redux';
import { redirectToAction } from './../shared/redux/redirect/redirectActionCreator';
export class Home extends PureComponent {
    createAdClickHandler(event){
        event.preventDefault();
        this.props.redirectToAction("/ad/create");
    }

    render() {
        return (
            <div>
                <AdsPageList></AdsPageList>
                <button onClick={this.createAdClickHandler.bind(this)}>CreateAd</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    redirectToAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
