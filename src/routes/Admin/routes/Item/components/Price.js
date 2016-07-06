import React from 'react'
import * as Cookies from 'js-cookie'

const Price = React.createClass({
  getInitialState() {
    return {price: 0};
  },

  componentWillReceiveProps(newProps) {
    if(newProps.manage.get('type') === 'ITEM_INFO_SUCCESSED') {
      this.setState({price: newProps.manage.get('results')[0].price});
      $('.price.input input').val(newProps.manage.get('results')[0].price);
    }
  },

  priceOnChange(event) {
    var price = parseInt(event.target.value);

    if(!isNaN(price)) {
      this.setState({price: price});
      $.ajax({
        url: '/api/setPrice',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          token: Cookies.get('token'), 
          item:this.props.manage.get('results')[0].id,
          price: price,
        }),
      })
      .done((res)=>{
        this.props.func.itemInfo({name:this.props.manage.get('results')[0].name});
      })
    }
    else {
      alert(`請輸入數字!`);
      event.target.value = this.state.price;
    }
  },

  adminRender(){
    var style = {
      inoutInput: {
        width: '90px',
      },
      title2: {
        fontSize: '20px',
        display: 'inline-block',
      },
    }
    if(Cookies.get('type') != 'admin'){
      return (
        <div style={style.title2}>項目單價:&nbsp;{this.state.price}</div>
      )
    }
    else{
      return(
        <div>
          <div style={style.title2}>項目單價:&nbsp;</div>
          <div className='ui input price' style={ style.inoutInput }>
            <input type='text' defaultValue='0' onBlur={ this.priceOnChange }/>
          </div>
        </div>
      )
    }
  },

  render() {
    var style = {
      inoutInput: {
        width: '90px',
      },
      title2: {
        fontSize: '20px',
        display: 'inline-block',
      },
    }

    return(
      <div>
        {this.adminRender()}
      </div>
    )
  }
})

module.exports = Price;
