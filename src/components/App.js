import React from 'react'
import { bindActionCreators } from 'redux'
import { connect  } from 'react-redux'
import { Link, IndexLink } from 'react-router'

import * as Actions from '../actions/index'

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}


const App = React.createClass({
  componentDidMount() {
  },

  childProps(name) {
    let obj = {
      func: {
        // general func
        login: this.props.login,
        checkToken: this.props.checkToken,
        itemList: this.props.itemList,
        orderList: this.props.orderList,

        // func for service
        clearSelected: this.props.clearSelected,
        unitList: this.props.unitList,
        consumeableOrder: this.props.consumeableOrder,
        updateOrder: this.props.updateOrder,
        updateSelected: this.props.updateSelected, 
        updateSelectedAmount: this.props.updateSelectedAmount,
        // func for manage
        addItem: this.props.addItem,
        delItem: this.props.delItem,
        inout: this.props.inout,
        itemInfo: this.props.itemInfo,
        orderInfo: this.props.orderInfo,
        finishOrder: this.props.finishOrder,
        finishSel: this.props.finishSel,

        ureset: this.props.ureset,
      },
      auth: this.props.auth,
      manage: this.props.manage,
      service: this.props.service,
    };
    return obj;
  },

  render() {
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, this.childProps(child.type.displayName));
    })

    var style = {
      app: {
        backgroundImage: 'url(/bg.jpg)',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        overflowY: 'scroll',
        overflowX: 'hidden',
        width: '100%',
        height: '100%',
      }
    }

    return (
      <div style={ style.app }>
        { childrenWithProps }
      </div>
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
