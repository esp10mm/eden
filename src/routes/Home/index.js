import React from 'react'
import { browserHistory } from 'react-router'

const button = (pos) => {
  var style = {
    width: '200px',
    height: '100px',
    margin: '0px auto',
  };

  if(pos === 'right') {
    return style;
  }
  else {
    return style;
  }

}

const Home = React.createClass({
  componentWillMount() {
    this.props.func.checkToken(); 
  },

  componentDidMount() {
    $('.inverted.segment').on('mouseover',(e)=>{$(e.target).addClass('secondary')})
    $('.inverted.segment').on('mouseleave',(e)=>{$(e.target).removeClass('secondary')})
    $('.main').transition('fade');
  },

  toPage(path) {
    $('.main').transition('fade');

    if(path == '/admin') {
      setTimeout(()=>{
        if(!this.props.auth.login)
          browserHistory.push('/login');
        else
          browserHistory.push('/admin');
      }, 500)
    }
    else
      browserHistory.push(path);
  },

  render() {
    var style = {
      container: {
        maxWidth: '700px',
        height: '100%',
        margin: '0px auto',
      },
      button: {
        width: '200px',
        height: '100px',
        margin: '0px auto',
        lineHeight: '40px',
        fontSize: '30px',
        textAlign: 'center',
        cursor: 'pointer',
        cursor: 'hand',
      },
      buttonSmall: {
        width: '100px',
        height: '50px',
        margin: '0px auto',
        lineHeight: '20px',
        fontSize: '15px',
        textAlign: 'center',
        cursor: 'pointer',
        cursor: 'hand',
      },
    };

    return(
      <div className='ui stackable three column grid' style={ style.container }>
        <div className='row'/>
        <div className='row'/>
        <div className='row'>

          <div className='ui main center inverted green aligned segment' onClick={ ()=>this.toPage('/service') } style={ style.button }>
            物品申請
          </div>
          
        </div>
        <div className='row'>
          <div className='ui main center segment' onClick={()=>this.toPage('/admin')} style={ style.buttonSmall }> 
            總務登入
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Home;
