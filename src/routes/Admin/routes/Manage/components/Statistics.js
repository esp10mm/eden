import React from 'react'
import * as Cookies from 'js-cookie'

const Statistics = React.createClass({
  getInitialState() {
    return {
      years: [],
    }
  },

  componentDidMount() {
    $.ajax({
      url: '/api/getYearRange',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({token: Cookies.get('token'), uid:Cookies.get('uid')}),
    })
    .done((res)=>{
      var years = [];
      for(var i=parseInt(res.min); i <= parseInt(res.max); i++)
        years.push(i);
      console.log(years);
      this.setState({years:years});
    })
  },

  genYearStat(year) {
    var win = window.open(`/statistics/${year}`, '_blank'); 
    win.focus();
  },

  render() {
    var genYearStat = this.genYearStat;

    return(
      <div className='content'>
      {
        this.state.years.map((year, index)=>{
         return <div className='ui button' key={index} onClick={()=>genYearStat(year)}>{year}年</div> 
        })
      } 
      </div>
    )
  }
})

module.exports = Statistics;
