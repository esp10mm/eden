import React from 'react'
import AddItem from './AddItem'
import DelItem from './DelItem'
import ImportExport from './ImportExport'

const ItemEdit = React.createClass({

  render() {

    return(
      <div className='content'>

        <AddItem func={this.props.func} manage={ this.props.manage } />

        <ImportExport func={this.props.func} manage={ this.props.manage } />

      </div>
    )
  }
})

module.exports = ItemEdit;
