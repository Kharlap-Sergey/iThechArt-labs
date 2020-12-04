import React, { PureComponent } from 'react';

class ShordAd extends PureComponent {
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.title}
      </div>
    );
  }
}

export default ShordAd;
