import React from "react";

class Ad extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props.props)
        let ad = this.props.props;
        return (
            <li className="ads__item ad">
                <div className="ad__title">
                    <span className="ad__title-text">{ad.title}</span>
                    <span className="ad__creation-date">{ad.dateOfPublication}</span>
                </div>
                <div className="ad__more">
                    <button className="ad__more-btn">more</button>
                    <div className="ad__author-profile"><a href="" className="ad__author-href"></a></div>
                </div>
            </li>
        );
    }
}

export default Ad;
