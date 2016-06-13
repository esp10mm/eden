import React from 'react'
import ImportExport from './ImportExport'
import Price from './Price'
import { browserHistory } from 'react-router'

const Item = React.createClass({
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

              <div style={style.title}>{ this.props.params.name }</div>
              <div className='ui divider'/>

              <div style={style.title2}>自購數量:&nbsp;</div>
              <div className='item amount' style={style.title2}/>
              <br/><br/>

              <div style={style.title2}>捐物數量:&nbsp;</div>
              <div className='item donation' style={style.title2}/>
              <br/><br/>

              <div style={style.title2}>項目進出:&nbsp;</div><br/>
              <ImportExport manage={ this.props.manage } func={this.props.func} name={ this.props.params.name }/>


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
