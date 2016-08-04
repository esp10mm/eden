import React from 'react'
import ImportExport from './ImportExport'
import Price from './Price'
import { browserHistory } from 'react-router'
import * as Cookies from 'js-cookie'

const Item = React.createClass({
  getInitialState(){
    return({
      name: this.props.params.name,
    })
  },

  componentDidMount() {
    this.props.func.itemInfo({name:this.props.params.name});
  },

  componentWillReceiveProps(newProps) {
    if(newProps.manage.get('type') === 'ITEM_INFO_SUCCESSED') {
      $('.item.amount').text(newProps.manage.get('results')[0].amount);
      $('.item.donation').text(newProps.manage.get('results')[0].donation);
    }
  },

  toPage(path) {
    // $('.main').transition('fade');

    // setTimeout(()=>{
    //     browserHistory.push(path);
    // }, 500)
    browserHistory.push(path);
  },

  adminRender(){
    if(Cookies.get('type') != 'admin')
      return;
    else{
      var style = {
        title2: {
          fontSize: '20px',
          display: 'inline-block',
        },
      }
      return(
        <div>
          <div style={style.title2}>項目進出:&nbsp;</div><br/>
          <ImportExport manage={ this.props.manage } func={this.props.func} name={ this.state.name }/>
        </div>
      )
    }
  },

  editItemName(event){
    console.log(event.target.value);
    $.ajax({
      url: '/api/editItemName',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        token: Cookies.get('token'), 
        oldName: this.state.name,
        newName: event.target.value,
      }),
    })
    .done((res)=>{
      this.setState({name: event.target.value});
      alert('變更項目名稱成功!');
    })
  },

  render() {
    var style = {
      container: {
        maxWidth: '700px',
        height: '100%',
        margin: '0px auto',
      },
      mainSegment: {
        width: '95%',
        margin: '0px auto',
      },
      button: {
        width: '200px',
        height: '100px',
        margin: '0px auto',
        lineHeight: '40px',
        fontSize: '30px',
        textAlign: 'center',
      },
      title: {
        fontSize: '35px',
        fontWeight: 'bold',
        display: 'inline-block',
      },
      title2: {
        fontSize: '20px',
        display: 'inline-block',
      },
    }

    return(
      <div className='ui stackable three column grid' style={ style.container }>
        <div className='row'/>
        <div className='row'>
          <div style={style.mainSegment}>
            <div className='ui segment'>

              <div className='ui input' style={{width:'300px'}} >
                <input type='text' defaultValue={this.state.name} onBlur={this.editItemName}/>
              </div>

              <div className='ui divider'/>

              <div style={style.title2}>自購數量:&nbsp;</div>
              <div className='item amount' style={style.title2}/>
              <br/><br/>

              <div style={style.title2}>捐物數量:&nbsp;</div>
              <div className='item donation' style={style.title2}/>
              <br/><br/>

              {this.adminRender()}

              <Price manage={ this.props.manage } func={ this.props.func } /><br/><br/>

              <div className='ui button' onClick={ ()=>this.toPage('/admin') }>回管理頁面</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
})

module.exports = Item;
