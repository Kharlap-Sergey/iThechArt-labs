import React, { PureComponent } from 'react'
import "./avatar.scss"
export class Avatar extends PureComponent {
    render() {
        return (
            <div className="avatar">
                <img src={this.props.source} alt={this.props.alternativeMessage} className="avatar__img" />
            </div>
        )
    }
}

export default Avatar
