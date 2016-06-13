import React, { Component, PropTypes } from 'react'

class Code extends Component {
  render() {
    const { imgSrc, cardName } = this.props;
    
    var style = {
      code: {
        width: '100px',
        display: 'inline-block',
        margin: '5px',
      },
      codeImg: {
        width: '100px',
      },
    }
    
    return (
      <div className='code' style={ style.code }>
        <img src={`/qr?t=${ cardName }`} style={ style.codeImg }></img>
        <div className='content'>
          <a className='header'>{ cardName }</a>
        </div>
      </div>
    )

  }
}

Code.propTypes = {
  imgSrc: PropTypes.string,
  cardName: PropTypes.string,
}

export default Code
