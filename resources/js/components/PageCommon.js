import React, {Component} from 'react';

class PageCommon extends Component {
  render() {
    return (
      <h2>{this.props.msg}</h2>
    )
  }
}

export default PageCommon;