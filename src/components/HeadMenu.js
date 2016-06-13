import React, {  Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'

export const HeadMenu = React.createClass({

  render() {
    return (
      <div className='ui top fixed menu'>
        <IndexLink className='item' to='/'>
          Index  
        </IndexLink>
        <Link className='item' to='/codelist'>
          CodeList  
        </Link>
      </div>
    )
  }
})

