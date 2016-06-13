import React from 'react'
import { browserHistory } from 'react-router'

const ItemList = React.createClass({
  componentDidMount() {
  },

  componentWillReceiveProps(newProps) {
   
    if(newProps.manage.get('type') === 'ITEM_LIST_SUCCESSED') {
      var html = '';
      const results = newProps.manage.get('results');
      for(var k in results){
        html += `<tr><td><a class='tdname'>${results[k].name}</a></td><td>${results[k].amount}</td><td>${results[k].donation}</td></tr>`;
      }
      $('.itemList.tbody').html(html);

      $('.tdname').on('click', (e)=>{
        this.toPage(`/admin/item/${$(e.target).text()}`);
      })
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
    return(
      <div className='content'>
        <table className='ui striped table'>
          <thead>
            <tr>
              <th>項目名稱</th>
              <th>自購數量</th>
              <th>捐贈數量</th>
            </tr>
          </thead>
          <tbody className='itemList tbody'>
          </tbody>
        </table>
      </div>
    )
  }
})

module.exports = ItemList;
