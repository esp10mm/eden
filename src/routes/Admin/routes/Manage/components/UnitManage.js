import React from 'react'
import * as Cookies from 'js-cookie'
import { browserHistory } from 'react-router'

const UnitRow = React.createClass({
  componentDidMount(){
  },

  removeUnit(){
    this.props.removeUnit(this.props.unit.id);
  },

  updateUnitName(e){
    this.props.updateState(this.props.unit.id, `name`, e.target.value);
  },

  render(){

    let style = {
      input: {
      }     
    }

    return(
      <tr>
        <td>
          <div className='ui input' style={style.input}>
            <input type='text' defaultValue={this.props.unit.name.trim()} onBlur={this.updateUnitName}/>
          </div>
        </td>
        <td>
          <i className='ui remove red icon' onClick={this.removeUnit}/>
        </td>
      </tr>
    )
  }
})

const UnitList = React.createClass({
  render() {
    return(
      <table className='ui striped table'>
        <thead>
          <tr>
            <th>組別名稱</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.unit.map((unit)=>{
            return(
              <UnitRow key={unit.id} unit={unit} removeUnit={this.props.removeUnit} updateState={this.props.updateState}/>
              )
          })
        }
        </tbody>
      </table>
    )
  }

})

const UnitManage = React.createClass({
  getInitialState(){
    return({unit:[]});
  },

  componentDidMount(){
  },

  componentWillReceiveProps(newProps){
    if(newProps.manage.get('type') == 'UNIT_LIST_SUCCESSED'){
      this.setState({unit:newProps.manage.get('unit')});
    }
  },

  addUnit(){
    $.ajax({
      url: '/api/addUnit',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        token: Cookies.get('token'), 
      }),
    })
    .done((res)=>{
      this.props.func.unitList();
    })
  },

  updateState(id, prop, value){
    let state = this.state;
    let index = state.unit.findIndex((c)=>{
      return c.id == id;
    });
    state.unit[index][prop] = value;
    this.setState(state);
  },

  removeUnit(id){
    console.log(id);
    $.ajax({
      url: '/api/removeUnit',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        token: Cookies.get('token'), 
        id: id,
      }),
    })
    .done((res)=>{
      this.props.func.unitList();
    })
  },

  saveChange(){
    $.ajax({
      url: '/api/editUnit',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        token: Cookies.get('token'), 
        unit: this.state.unit,
      }),
    })
    .done((res)=>{
      alert('儲存變更成功!');
      this.props.func.unitList();
    })
  },

  render() {
    let unit = [];

    return(
      <div className='content'>
        <UnitList unit={this.state.unit} removeUnit={this.removeUnit} updateState={this.updateState}/>
        <div className='ui button' onClick={this.addUnit}>新增單位</div>
        <div className='ui button' onClick={this.saveChange}>儲存變更</div>
      </div>
    )
  }
})

module.exports = UnitManage;
