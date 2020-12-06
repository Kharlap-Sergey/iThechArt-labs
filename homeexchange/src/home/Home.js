import React, { PureComponent } from 'react'
import AdsPageList from '../shared/components/adsPageList/AdsPageList'

export class Home extends PureComponent {
    render() {
        return (
            <div>
                <AdsPageList shouldAvatarDisplay={true}></AdsPageList>
            </div>
        )
    }
}

export default Home
