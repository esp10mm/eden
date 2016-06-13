import React, {  Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'

export const SideMenu = React.createClass({
  componentDidMount() {
    $('.ui.sidebar').sidebar('setting', 'transition', 'overlay')
  },

  sidebarToggle() {
    $('.ui.sidebar').sidebar('toggle');
  },

  render() {
    return (
      <div className='ui sidebar inverted vertical menu'>
        <IndexLink className='item' to='/' onClick={ this.sidebarToggle }>
          Index  
        </IndexLink>
        <Link className='item' to='/codelist'>
          CodeList  
        </Link>
      </div>
    )
  }
})

