import React from 'react'
import * as Cookies from 'js-cookie'

const Statistic = React.createClass({
  itemName(id) {
    for(var k in this.props.data.list) {
      if(this.props.data.list[k].id == id)
        return this.props.data.list[k].name;
    }
  },

  itemMonth(item, month) {
    if(item['months'][month] === undefined)
      return 0;
    else
      return item['months'][month];
  },

  render() {
    var itemName = this.itemName;
    var items = this.props.data.statistic.items;
    var itemMonth = this.itemMonth;
    var newItems = [];

    for(var k in items) {
      newItems.push({months:items[k], name:this.itemName(k), id:k});
    }

    return(
      <table className='ui table'>
        <thead>
          <tr>
            <th>
              {`${this.props.index+1}.${this.props.data.statistic.name}`}
            </th>
            <th style={{'width':'7.5%'}}> 1月</th>
            <th style={{'width':'7.5%'}}> 2月</th>
            <th style={{'width':'7.5%'}}> 3月</th>
            <th style={{'width':'7.5%'}}> 4月</th>
            <th style={{'width':'7.5%'}}> 5月</th>
            <th style={{'width':'7.5%'}}> 6月</th>
            <th style={{'width':'7.5%'}}> 7月</th>
            <th style={{'width':'7.5%'}}> 8月</th>
            <th style={{'width':'7.5%'}}> 9月</th>
            <th style={{'width':'7.5%'}}>10月</th>
            <th style={{'width':'7.5%'}}>11月</th>
            <th style={{'width':'7.5%'}}>12月</th>
          </tr>
        </thead>
        <tbody>
        {
          newItems.map((item, index)=>{
            return(
              <tr key={index}>
                <td>
                  {item.name}
                </td>
                <td>{ itemMonth(item, '01') }</td>
                <td>{ itemMonth(item, '02') }</td>
                <td>{ itemMonth(item, '03') }</td>
                <td>{ itemMonth(item, '04') }</td>
                <td>{ itemMonth(item, '05') }</td>
                <td>{ itemMonth(item, '06') }</td>
                <td>{ itemMonth(item, '07') }</td>
                <td>{ itemMonth(item, '08') }</td>
                <td>{ itemMonth(item, '09') }</td>
                <td>{ itemMonth(item, '10') }</td>
                <td>{ itemMonth(item, '11') }</td>
                <td>{ itemMonth(item, '12') }</td>
              </tr>
            )
          }) 
        }
        </tbody>
      </table>
    )
  }
})

const Statistics = React.createClass({
  getInitialState() {
    return {statistics: [], list:[]};
  },

  componentDidMount() {
    $('body').css('overflow', 'scroll');
    $.ajax({
      url: '/api/statistics',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({token: Cookies.get('token'), year:this.props.params.year, uid: Cookies.get('uid')}),
    })
    .done((res)=>{
     
      var obj = res.unit;
      var items = res.orders_item;

      for(var k in obj)
        obj[k].items = {};

      for(var i in items) {
        for(var j in obj) {
          if(obj[j].id == items[i].unit) {

            if(obj[j]['items'][items[i].item]===undefined)
              obj[j]['items'][items[i].item] = {};

            if(obj[j]['items'][items[i].item][items[i].month]===undefined )
              obj[j]['items'][items[i].item][items[i].month] = (items[i].export+items[i].export_dona);
            else
              obj[j]['items'][items[i].item][items[i].month] += (items[i].export+items[i].export_dona);

            break;
          }
        }
      }
      console.log(obj);
      this.setState({statistics:obj});
      this.setState({list:res.warehouse});
    })
  },

  render() {
    var list = this.state.list;

    return(
      <div>
      {
        this.state.statistics.map((statistic, index)=>{
          return <Statistic key={index} data={{statistic:statistic, list:list}} index={index}/> 
        }) 
      }
      </div>
    )
  }
})

module.exports = Statistics;
