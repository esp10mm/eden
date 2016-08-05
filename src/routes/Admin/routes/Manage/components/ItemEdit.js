import React from 'react'
import DelItem from './DelItem'
import ImportExport from './ImportExport'

const ItemEdit = React.createClass({

  render() {

    return(
      <div className='content'>

        <ImportExport func={this.props.func} manage={ this.props.manage } />

      </div>
    )
  }
})

module.exports = ItemEdit;
