import React from 'react'

const LoadingPage = React.createClass({

  render() {
    var style = {
      width: '100%',
      height: '100%',
    };

    return(
      <div style={ style }>
        <div className='ui active loader'/>
      </div>
    )
  }
})

export default LoadingPage
