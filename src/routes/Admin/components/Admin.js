import React from 'react'
import LoadingPage from '../../../components/LoadingPage'
import { browserHistory } from 'react-router'
import * as Cookies from 'js-cookie'

const Admin = React.createClass({
  componentDidMount() {
  },

  componentWillMount() {
    if(Cookies.get('type')=='user'){
      alert('權限不足');
      browserHistory.push('/');
    }
  },

  childProps(name) {
    let obj = {
      auth: this.props.auth,
      manage: this.props.manage,
      func: this.props.func,
    };
    return obj;
  },

  render() {
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, this.childProps(child.type.displayName));
    })

    return(
      <div>
        { childrenWithProps }
      </div>
    )
  }
})

module.exports = Admin;
