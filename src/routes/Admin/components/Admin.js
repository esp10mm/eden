import React from 'react'
import LoadingPage from '../../../components/LoadingPage'
import { browserHistory } from 'react-router'
import * as Cookies from 'js-cookie'

const Admin = React.createClass({
  componentDidMount() {
  },

  componentWillMount() {
    if(!this.props.auth.login){
      this.props.func.checkToken();
    }
    else if(Cookies.get('type')=='user'){
      alert('權限不足');
      browserHistory.push('/');
    }
  },

  componentWillReceiveProps(newProps) {
    if(newProps.auth.login)
      this.render();
    else
      browserHistory.push('/login');
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

    if(!this.props.auth.login)
      return(
        <LoadingPage/>
      )
    else
      return(
        <div>
          { childrenWithProps }
        </div>
      )
  }
})

module.exports = Admin;
