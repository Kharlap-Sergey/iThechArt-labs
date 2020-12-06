import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import AccountAvatar from '../shared/components/accountAvatar/AccountAvatar'
import Loader from '../shared/components/Loader/Loader';
import { getAd } from '../shared/redux/ad/adActionCreator';

class Ad extends PureComponent {
    constructor(props) {
        super(props);

        let url = window.location.href;
        let parts = url.split("/");
        let id = parts[parts.length - 1];
        this.state = { adId: id }
    }

    componentDidMount() {
        this.props.getAd(this.state.adId);
    }

    getAdContent = (ad) => (<div className="ad">
        <div className="ad__aside">
            <AccountAvatar></AccountAvatar>
        </div>
        <div className="ad__main">
            <div className="ad__title">{ad.title}</div>
            <div className="ad__type">{ad.type}</div>
            <div className="ad__description">{ad.description}</div>
            {
                this.props.userId === this.props.ad.authorId
                    ? (
                        <>
                            <button>edit</button>
                            <button>remove</button>
                        </>
                    )
                    : <button>subscribe</button>
            }
        </div>
    </div>)

    render() {
        console.log("render");
        const ad = this.props.ad
        console.log(ad);
        return (
            ad
            ? this.getAdContent(ad)
            : <Loader/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.user,
        ad: state.ads.ad
    }
}
const mapDispatchToProps = {
    getAd
}
export default connect(mapStateToProps, mapDispatchToProps)(Ad);
