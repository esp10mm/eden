import React from 'react'
import * as Cookies from 'js-cookie'

const Statistic = React.createClass({
  itemName(id) {
    for(var k in this.props.data.list) {
      if(this.props.data.list[k].id == id)
        return this.props.data.list[k].name;
    }
  },

  itemPrice(id) {
    for(var k in this.props.data.list) {
      if(this.props.data.list[k].id == id)
        return this.props.data.list[k].price;
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
    var index = (this.props.len==1)?'':`${this.props.index+1}.`;

    for(var k in items) {
      newItems.push({months:items[k], name:this.itemName(k), id:k, price:this.itemPrice(k)});
    }

    return(
      <table className='ui table'>
        <thead>
          <tr>
            <th style={{'width':'4%'}}>
              {`${index}${this.props.data.statistic.name}`}
            </th>
            <th style={{'width':'3%'}}> 1月</th>
            <th style={{'width':'5%'}}>金額</th>
            <th style={{'width':'3%'}}> 2月</th>
            <th style={{'width':'5%'}}>金額</th>
            <th style={{'width':'3%'}}> 3月</th>
            <th style={{'width':'5%'}}>金額</th>
            <th style={{'width':'3%'}}> 4月</th>
            <th style={{'width':'5%'}}>金額</th>
            <th style={{'width':'3%'}}> 5月</th>
            <th style={{'width':'5%'}}>金額</th>
            <th style={{'width':'3%'}}> 6月</th>
            <th style={{'width':'5%'}}>金額</th>
            <th style={{'width':'3%'}}> 7月</th>
            <th style={{'width':'5%'}}>金額</th>
            <th style={{'width':'3%'}}> 8月</th>
            <th style={{'width':'5%'}}>金額</th>
            <th style={{'width':'3%'}}> 9月</th>
            <th style={{'width':'5%'}}>金額</th>
            <th style={{'width':'3%'}}>10月</th>
            <th style={{'width':'5%'}}>金額</th>
            <th style={{'width':'3%'}}>11月</th>
            <th style={{'width':'5%'}}>金額</th>
            <th style={{'width':'3%'}}>12月</th>
            <th style={{'width':'5%'}}>金額</th>
          </tr>
        </thead>
        <tbody>
        {
          newItems.map((item, index)=>{
            if(item.name === undefined)
              return;
            return(
              <tr key={index}>
                <td>
                  {item.name}
                </td>
                <td>{ itemMonth(item, '01') }</td>
                <td>{ itemMonth(item, '01')*item.price }</td>
                <td>{ itemMonth(item, '02') }</td>
                <td>{ itemMonth(item, '02')*item.price }</td>
                <td>{ itemMonth(item, '03') }</td>
                <td>{ itemMonth(item, '03')*item.price }</td>
                <td>{ itemMonth(item, '04') }</td>
                <td>{ itemMonth(item, '04')*item.price }</td>
                <td>{ itemMonth(item, '05') }</td>
                <td>{ itemMonth(item, '05')*item.price }</td>
                <td>{ itemMonth(item, '06') }</td>
                <td>{ itemMonth(item, '06')*item.price  }</td>
                <td>{ itemMonth(item, '07') }</td>
                <td>{ itemMonth(item, '07')*item.price  }</td>
                <td>{ itemMonth(item, '08') }</td>
                <td>{ itemMonth(item, '08')*item.price  }</td>
                <td>{ itemMonth(item, '09') }</td>
                <td>{ itemMonth(item, '09')*item.price  }</td>
                <td>{ itemMonth(item, '10') }</td>
                <td>{ itemMonth(item, '10')*item.price  }</td>
                <td>{ itemMonth(item, '11') }</td>
                <td>{ itemMonth(item, '11')*item.price  }</td>
                <td>{ itemMonth(item, '12') }</td>
                <td>{ itemMonth(item, '12')*item.price  }</td>
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

    var year = this.props.params.year.split('_')[0];
    var unit = this.props.params.year.split('_')[1];
    var item_type = this.props.params.year.split('_')[2];

    $.ajax({
      url: '/api/statistics',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        token: Cookies.get('token'), 
        year:year, 
        unit:unit, 
        item_type:item_type, 
        uid: Cookies.get('uid')
      }),
    })
    .done((res)=>{
      var items = res.orders_item;
      var obj = [];

      if(unit !== 'all' && unit !=='sum') {
        for(var k in res.unit){
          if(res.unit[k].id == unit)
            obj.push(res.unit[k]);
        }
      }
      else if(unit == 'sum') {
        obj = [res.unit[0]];
        obj[0].name = '總計';
      }
      else
        obj = res.unit;

      for(var k in obj){
        obj[k].items = {};
      }

      for(var i in items) {
        if(unit=='sum') {

          if(obj[0]['items'][items[i].item]===undefined)
            obj[0]['items'][items[i].item] = {};

          if(obj[0]['items'][items[i].item][items[i].month]===undefined )
            obj[0]['items'][items[i].item][items[i].month] = (items[i].export+items[i].export_dona);
          else
            obj[0]['items'][items[i].item][items[i].month] += (items[i].export+items[i].export_dona);
          continue;   
        }

        for(var j in obj) {
          if(obj[j].id == items[i].unit) {
            console.log(items[i]);
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
      this.setState({statistics:obj});
      this.setState({list:res.warehouse});
    })
  },

  render() {
    var list = this.state.list;
    var len = this.state.statistics.length;

    return(
      <div>
      {
        this.state.statistics.map((statistic, index)=>{
          return <Statistic key={index} data={{statistic:statistic, list:list}} index={index} len={len}/> 
        }) 
      }
      </div>
    )
  }
})

module.exports = Statistics;
