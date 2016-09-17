import React from 'react'
import * as Cookies from 'js-cookie'

const Statistics = React.createClass({
  getInitialState() {
    return {
      years: [],
      units: [],
    }
  },

  componentWillReceiveProps(newProps) {
    if(newProps.manage.get('type')==='UNIT_LIST_SUCCESSED'){
      this.setState({units:newProps.manage.get('unit')});
      $('.unit.dropdown').dropdown();
      $('.years.dropdown').dropdown();
      $('.item_type.dropdown').dropdown();
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
      this.setState({years:years});
      this.props.func.unitList();
    })
  },

  genYearStat(year) {
    var win = window.open(`/statistics/${year}`, '_blank'); 
    win.focus();
  },

  queryStat() {
    var year = $('.years.dropdown').dropdown('get value');
    var unit = $('.unit.dropdown').dropdown('get value');
    var item_type = $('.item_type.dropdown').dropdown('get value');

    if(year.length == 0) {
      alert('請選擇年分!');
      return;
    }

    if(unit.length == 0) {
      alert('請選擇組別!');
      return;
    }

    if(item_type.length == 0) {
      alert('請選擇類別!');
      return;
    }

    var win = window.open(`/statistics/${year}_${unit}_${item_type}`, '_blank'); 
    win.focus();

  },

  render() {
    var genYearStat = this.genYearStat;

    return(
      <div className='content'>

        <div className="ui years selection dropdown">
          <input type="hidden" name="unit"/>
          <i className="dropdown icon"/>
          <div className="default text">選擇年份</div>
          <div className="menu">
          {
            this.state.years.map(function(y){
              return <div className='item' key={y} data-value={y}>{`${y}年`}</div> 
            })
          } 
          </div>
        </div>&nbsp;

        <div className="ui unit selection dropdown">
          <input type="hidden" name="unit"/>
          <i className="dropdown icon"/>
          <div className="default text">選擇組別</div>
          <div className="menu">
            <div className='item' key={-1} data-value='all'>全部組別</div>
            <div className='item' key={-2} data-value='sum'>總計</div>
          {
            this.state.units.map(function(u){
              return <div className='item' key={u.id} data-value={u.id}>{u.name}</div> 
            })
          } 
          </div>
        </div>&nbsp;

        <div className="ui item_type selection dropdown">
          <input type="hidden" name="item"/>
          <i className="dropdown icon"/>
          <div className="default text">選擇類別</div>
          <div className="menu">
            <div className='item' key={0} data-value='0'>耗材</div>
            <div className='item' key={1} data-value='1'>文具</div>
            <div className='item' key={2} data-value='2'>借物</div>
            <div className='item' key={3} data-value='3'>活動</div>
            <div className='item' key={4} data-value='4'>維修</div>
            <div className='item' key={5} data-value='5'>領物</div>
          </div>
        </div>&nbsp;

        <div className='ui button' onClick={this.queryStat}>查詢</div>
      </div>
    )
  }
})

module.exports = Statistics;
