webpackJsonp([9],{

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouter = __webpack_require__(10);\n\nvar _jsCookie = __webpack_require__(12);\n\nvar Cookies = _interopRequireWildcard(_jsCookie);\n\nvar ItemRow = _react2['default'].createClass({\n  displayName: 'ItemRow',\n\n  toPage: function toPage(path) {\n    // $('.main').transition('fade');\n\n    // setTimeout(()=>{\n    //     browserHistory.push(path);\n    // }, 500)\n    _reactRouter.browserHistory.push(path);\n  },\n\n  adminRender: function adminRender(num) {\n    if (Cookies.get('type') == 'admin' && num == 0) {\n      return _react2['default'].createElement(\n        'td',\n        null,\n        _react2['default'].createElement(\n          'div',\n          { className: 'ui ' + disabled + ' export input ', style: style.input },\n          _react2['default'].createElement('input', { type: 'text', defaultValue: this.props.item['export'] })\n        )\n      );\n    } else if (num == 0) {\n      return _react2['default'].createElement(\n        'td',\n        null,\n        this.props.item['export']\n      );\n    } else if (Cookies.get('type') == 'admin' && num == 1) {\n      return _react2['default'].createElement(\n        'td',\n        null,\n        _react2['default'].createElement(\n          'div',\n          { className: 'ui ' + disabled + ' export_dona input ', style: style.input },\n          _react2['default'].createElement('input', { type: 'text', defaultValue: this.props.item.export_dona })\n        )\n      );\n    } else if (num == 1) {\n      return _react2['default'].createElement(\n        'td',\n        null,\n        this.props.item.export_dona\n      );\n    }\n  },\n\n  render: function render() {\n    var _this = this;\n\n    var style = {\n      input: {\n        width: '70px',\n        height: '30px'\n      }\n    };\n\n    var disabled = this.props.isFinished ? 'disabled' : '';\n\n    var msg = function msg() {\n      if (_this.props.order_type == 'stationery') {\n        return _react2['default'].createElement(\n          'td',\n          null,\n          _this.props.item.msg\n        );\n      }\n    };\n\n    return _react2['default'].createElement(\n      'tr',\n      null,\n      _react2['default'].createElement(\n        'td',\n        null,\n        _react2['default'].createElement(\n          'a',\n          { onClick: function () {\n              return _this.toPage('/admin/item/' + _this.props.item.name);\n            } },\n          this.props.item.name\n        )\n      ),\n      _react2['default'].createElement(\n        'td',\n        null,\n        this.props.item.desired\n      ),\n      _react2['default'].createElement(\n        'td',\n        null,\n        this.props.item.amount + this.props.item.donation\n      ),\n      msg(),\n      this.adminRender(0),\n      this.adminRender(1)\n    );\n  }\n});\n\nvar ItemList = _react2['default'].createClass({\n  displayName: 'ItemList',\n\n  componentDidMount: function componentDidMount() {},\n\n  componentWillReceiveProps: function componentWillReceiveProps(newProps) {},\n\n  tableHead: function tableHead() {\n    if (this.props.order_type == 'stationery') {\n      return _react2['default'].createElement(\n        'th',\n        null,\n        '備註(說明)'\n      );\n    } else {\n      return;\n    }\n  },\n\n  render: function render() {\n    var isFinished = this.props.isFinished;\n    var orderTypeHead = '';\n    var order_type = this.props.order_type;\n\n    return _react2['default'].createElement(\n      'table',\n      { className: 'ui striped table' },\n      _react2['default'].createElement(\n        'thead',\n        null,\n        _react2['default'].createElement(\n          'tr',\n          null,\n          _react2['default'].createElement(\n            'th',\n            null,\n            '項目名稱'\n          ),\n          _react2['default'].createElement(\n            'th',\n            null,\n            '申請數量'\n          ),\n          _react2['default'].createElement(\n            'th',\n            null,\n            '庫存總量'\n          ),\n          this.tableHead(),\n          _react2['default'].createElement(\n            'th',\n            null,\n            '自購出貨量'\n          ),\n          _react2['default'].createElement(\n            'th',\n            null,\n            '捐物出貨量'\n          )\n        )\n      ),\n      _react2['default'].createElement(\n        'tbody',\n        null,\n        this.props.items.map(function (item, i) {\n          return _react2['default'].createElement(ItemRow, { key: item.item, item: item, index: i, isFinished: isFinished, order_type: order_type });\n        })\n      )\n    );\n  }\n});\n\nmodule.exports = ItemList;//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTYwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9BZG1pbi9yb3V0ZXMvT3JkZXIvY29tcG9uZW50cy9JdGVtTGlzdC5qcz8zYTEwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGJyb3dzZXJIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuaW1wb3J0ICogYXMgQ29va2llcyBmcm9tICdqcy1jb29raWUnXG5cbmNvbnN0IEl0ZW1Sb3cgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHRvUGFnZShwYXRoKSB7XG4gICAgLy8gJCgnLm1haW4nKS50cmFuc2l0aW9uKCdmYWRlJyk7XG5cbiAgICAvLyBzZXRUaW1lb3V0KCgpPT57XG4gICAgLy8gICAgIGJyb3dzZXJIaXN0b3J5LnB1c2gocGF0aCk7XG4gICAgLy8gfSwgNTAwKVxuICAgIGJyb3dzZXJIaXN0b3J5LnB1c2gocGF0aCk7XG4gIH0sXG5cbiAgYWRtaW5SZW5kZXIobnVtKXtcbiAgICBpZihDb29raWVzLmdldCgndHlwZScpPT0nYWRtaW4nICYmIG51bT09MCl7XG4gICAgICByZXR1cm4oXG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHVpICR7ZGlzYWJsZWR9IGV4cG9ydCBpbnB1dCBgfSBzdHlsZT17c3R5bGUuaW5wdXR9PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5pdGVtLmV4cG9ydH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC90ZD5cbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZihudW0gPT0gMCl7XG4gICAgICByZXR1cm4oXG4gICAgICAgIDx0ZD5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5pdGVtLmV4cG9ydH1cbiAgICAgICAgPC90ZD5cbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZihDb29raWVzLmdldCgndHlwZScpPT0nYWRtaW4nICYmIG51bT09MSl7XG4gICAgICByZXR1cm4oXG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHVpICR7ZGlzYWJsZWR9IGV4cG9ydF9kb25hIGlucHV0IGB9IHN0eWxlPXtzdHlsZS5pbnB1dH0+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLml0ZW0uZXhwb3J0X2RvbmF9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGQ+XG4gICAgICApXG4gICAgfSAgXG4gICAgZWxzZSBpZihudW0gPT0gMSl7XG4gICAgICByZXR1cm4oXG4gICAgICAgIDx0ZD5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5pdGVtLmV4cG9ydF9kb25hfVxuICAgICAgICA8L3RkPlxuICAgICAgKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0ge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgd2lkdGg6ICc3MHB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMzBweCcsXG4gICAgICB9LFxuICAgIH1cblxuICAgIHZhciBkaXNhYmxlZCA9IHRoaXMucHJvcHMuaXNGaW5pc2hlZD8gJ2Rpc2FibGVkJzonJztcblxuICAgIGNvbnN0IG1zZyA9ICgpPT57XG4gICAgICBpZih0aGlzLnByb3BzLm9yZGVyX3R5cGUgPT0gJ3N0YXRpb25lcnknKXtcbiAgICAgICAgcmV0dXJuIDx0ZD57dGhpcy5wcm9wcy5pdGVtLm1zZ308L3RkPjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4oXG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD48YSBvbkNsaWNrPXsgKCk9PnRoaXMudG9QYWdlKCcvYWRtaW4vaXRlbS8nK3RoaXMucHJvcHMuaXRlbS5uYW1lKX0+e3RoaXMucHJvcHMuaXRlbS5uYW1lfTwvYT48L3RkPlxuICAgICAgICA8dGQ+e3RoaXMucHJvcHMuaXRlbS5kZXNpcmVkfTwvdGQ+XG4gICAgICAgIDx0ZD57dGhpcy5wcm9wcy5pdGVtLmFtb3VudCArIHRoaXMucHJvcHMuaXRlbS5kb25hdGlvbn08L3RkPlxuICAgICAgICB7IG1zZygpIH1cbiAgICAgICAge3RoaXMuYWRtaW5SZW5kZXIoMCl9XG4gICAgICAgIHt0aGlzLmFkbWluUmVuZGVyKDEpfVxuICAgICAgPC90cj5cbiAgICApXG4gIH1cbn0pXG5cbmNvbnN0IEl0ZW1MaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gIH0sXG5cbiAgdGFibGVIZWFkKCl7XG4gICAgaWYodGhpcy5wcm9wcy5vcmRlcl90eXBlID09ICdzdGF0aW9uZXJ5Jyl7XG4gICAgICByZXR1cm4oXG4gICAgICAgIDx0aD7lgpnoqLso6Kqq5piOKTwvdGg+XG4gICAgICApO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGlzRmluaXNoZWQgPSB0aGlzLnByb3BzLmlzRmluaXNoZWQ7XG4gICAgbGV0IG9yZGVyVHlwZUhlYWQgPSAnJztcbiAgICBsZXQgb3JkZXJfdHlwZSA9IHRoaXMucHJvcHMub3JkZXJfdHlwZTtcbiAgICBcbiAgICByZXR1cm4oXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPSd1aSBzdHJpcGVkIHRhYmxlJz5cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0aD7poIXnm67lkI3nqLE8L3RoPlxuICAgICAgICAgICAgPHRoPueUs+iri+aVuOmHjzwvdGg+XG4gICAgICAgICAgICA8dGg+5bqr5a2Y57i96YePPC90aD5cbiAgICAgICAgICAgIHsgdGhpcy50YWJsZUhlYWQoKSB9XG4gICAgICAgICAgICA8dGg+6Ieq6LO85Ye66LKo6YePPC90aD5cbiAgICAgICAgICAgIDx0aD7mjZDnianlh7rosqjph488L3RoPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAge1xuICAgICAgICAgIHRoaXMucHJvcHMuaXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0sIGkpe1xuICAgICAgICAgICAgcmV0dXJuIDxJdGVtUm93IGtleT17aXRlbS5pdGVtfSBpdGVtPXtpdGVtfSBpbmRleD17aX0gaXNGaW5pc2hlZD17aXNGaW5pc2hlZH0gb3JkZXJfdHlwZT17b3JkZXJfdHlwZX0vPiBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIClcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBJdGVtTGlzdDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JvdXRlcy9BZG1pbi9yb3V0ZXMvT3JkZXIvY29tcG9uZW50cy9JdGVtTGlzdC5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7OztBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7O0FBRUE7QUFDQTtBQUVBO0FBRUE7OztBQUVBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7OztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOzs7QUFBQTtBQUFBO0FBQ0E7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7OztBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOzs7QUFDQTs7O0FBQ0E7Ozs7QUFBQTtBQUNBOzs7O0FBQUE7QUFDQTs7OztBQUFBO0FBQ0E7QUFDQTs7OztBQUFBO0FBQ0E7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function($) {'use strict';\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouter = __webpack_require__(10);\n\nvar _jsCookie = __webpack_require__(12);\n\nvar Cookies = _interopRequireWildcard(_jsCookie);\n\nvar _ItemList = __webpack_require__(160);\n\nvar _ItemList2 = _interopRequireDefault(_ItemList);\n\nvar Order = _react2['default'].createClass({\n  displayName: 'Order',\n\n  componentDidMount: function componentDidMount() {\n    this.props.func.orderInfo(this.props.params.id);\n  },\n\n  componentWillReceiveProps: function componentWillReceiveProps(newProps) {\n    if (newProps.manage.get('type') === 'FINISH_ORDER_SUCCESSED') {\n      this.props.func.orderInfo(this.props.params.id);\n    }\n  },\n\n  toPage: function toPage(path) {\n    _reactRouter.browserHistory.push(path);\n  },\n\n  finishOrder: function finishOrder(status) {\n    var items = this.props.manage.toObject().results.items;\n\n    $('.export.input input').each(function (i, t) {\n      items[i]['export'] = parseInt($(t).val());\n    });\n\n    $('.export_dona.input input').each(function (i, t) {\n      items[i].export_dona = parseInt($(t).val());\n    });\n\n    this.props.func.finishOrder(this.props.params.id, status, items);\n  },\n\n  adminRender: function adminRender(data) {\n    var _this = this;\n\n    if (Cookies.get('type') != 'admin') return;else {\n      return _react2['default'].createElement(\n        'div',\n        { className: data.finishBTNClass, onClick: function () {\n            return _this.finishOrder(status);\n          } },\n        data.finishBTNText\n      );\n    }\n  },\n\n  render: function render() {\n    var _this2 = this;\n\n    var style = {\n      container: {\n        maxWidth: '700px',\n        height: '100%',\n        margin: '0px auto'\n      },\n      mainSegment: {\n        width: '95%',\n        margin: '0px auto'\n      },\n      button: {\n        width: '200px',\n        height: '100px',\n        margin: '0px auto',\n        lineHeight: '40px',\n        fontSize: '30px',\n        textAlign: 'center'\n      },\n      title: {\n        fontSize: '35px',\n        fontWeight: 'bold',\n        display: 'inline-block'\n      },\n      title2: {\n        fontSize: '20px',\n        display: 'inline-block'\n      }\n    };\n\n    var manage = this.props.manage.toObject();\n    var unit = '';\n    var items = [];\n    var status = '';\n    var statusView = '';\n    var customer = '';\n    var order_type = '';\n\n    var isFinished = false;\n\n    var finishBTNClass = 'ui button green';\n    var finishBTNText = '完成訂單';\n\n    if (manage.results.order !== undefined) {\n      unit = manage.results.order.unit;\n      status = manage.results.order.status;\n      statusView = status == 'FINISH' ? '已完成' : '未完成';\n      customer = manage.results.order.customer;\n      order_type = manage.results.order.order_type;\n\n      $('.ui.checkbox').checkbox('set enabled');\n\n      if (status == 'FINISH') {\n        finishBTNClass = 'ui button red';\n        finishBTNText = '取消完成訂單';\n        isFinished = true;\n        $('.ui.checkbox').checkbox('set disabled');\n      }\n    }\n\n    if (manage.results.items !== undefined) items = manage.results.items;\n\n    return _react2['default'].createElement(\n      'div',\n      { className: 'ui stackable three column grid', style: style.container },\n      _react2['default'].createElement('div', { className: 'row' }),\n      _react2['default'].createElement(\n        'div',\n        { className: 'row' },\n        _react2['default'].createElement(\n          'div',\n          { style: style.mainSegment },\n          _react2['default'].createElement(\n            'div',\n            { className: 'ui segment' },\n            _react2['default'].createElement(\n              'div',\n              { style: style.title2 },\n              '申請單位: ',\n              unit\n            ),\n            _react2['default'].createElement('br', null),\n            _react2['default'].createElement(\n              'div',\n              { style: style.title2 },\n              '訂單狀態: ',\n              statusView\n            ),\n            _react2['default'].createElement('br', null),\n            _react2['default'].createElement(\n              'div',\n              { style: style.title2 },\n              '申請人: ',\n              customer\n            ),\n            _react2['default'].createElement('br', null),\n            _react2['default'].createElement(\n              'div',\n              { style: style.title2 },\n              '申請項目: '\n            ),\n            _react2['default'].createElement('br', null),\n            _react2['default'].createElement(_ItemList2['default'], { items: items, isFinished: isFinished, order_type: order_type }),\n            _react2['default'].createElement('br', null),\n            _react2['default'].createElement(\n              'div',\n              { className: 'ui button', onClick: function () {\n                  return _this2.toPage('/admin');\n                } },\n              '回管理頁面'\n            ),\n            this.adminRender({ finishBTNText: finishBTNText, finishBTNClass: finishBTNClass })\n          )\n        )\n      )\n    );\n  }\n});\n\nmodule.exports = Order;\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTYxLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9BZG1pbi9yb3V0ZXMvT3JkZXIvY29tcG9uZW50cy9PcmRlci5qcz81YjFjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGJyb3dzZXJIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuaW1wb3J0ICogYXMgQ29va2llcyBmcm9tICdqcy1jb29raWUnXG5pbXBvcnQgSXRlbUxpc3QgZnJvbSAnLi9JdGVtTGlzdCdcblxuY29uc3QgT3JkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMuZnVuYy5vcmRlckluZm8odGhpcy5wcm9wcy5wYXJhbXMuaWQpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICBpZihuZXdQcm9wcy5tYW5hZ2UuZ2V0KCd0eXBlJykgPT09ICdGSU5JU0hfT1JERVJfU1VDQ0VTU0VEJykge1xuICAgICAgdGhpcy5wcm9wcy5mdW5jLm9yZGVySW5mbyh0aGlzLnByb3BzLnBhcmFtcy5pZCk7XG4gICAgfVxuICB9LFxuICBcbiAgdG9QYWdlKHBhdGgpIHtcbiAgICBicm93c2VySGlzdG9yeS5wdXNoKHBhdGgpO1xuICB9LFxuXG4gIGZpbmlzaE9yZGVyKHN0YXR1cykge1xuICAgIHZhciBpdGVtcyA9IHRoaXMucHJvcHMubWFuYWdlLnRvT2JqZWN0KCkucmVzdWx0cy5pdGVtcztcblxuICAgICQoJy5leHBvcnQuaW5wdXQgaW5wdXQnKS5lYWNoKChpLCB0KT0+e1xuICAgICAgaXRlbXNbaV0uZXhwb3J0ID0gcGFyc2VJbnQoJCh0KS52YWwoKSk7XG4gICAgfSlcblxuICAgICQoJy5leHBvcnRfZG9uYS5pbnB1dCBpbnB1dCcpLmVhY2goKGksIHQpPT57XG4gICAgICBpdGVtc1tpXS5leHBvcnRfZG9uYSA9IHBhcnNlSW50KCQodCkudmFsKCkpO1xuICAgIH0pXG5cbiAgICB0aGlzLnByb3BzLmZ1bmMuZmluaXNoT3JkZXIodGhpcy5wcm9wcy5wYXJhbXMuaWQsIHN0YXR1cywgaXRlbXMpO1xuICB9LFxuXG4gIGFkbWluUmVuZGVyKGRhdGEpe1xuICAgIGlmKENvb2tpZXMuZ2V0KCd0eXBlJykgIT0gJ2FkbWluJykgXG4gICAgICByZXR1cm47XG4gICAgZWxzZXtcbiAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2RhdGEuZmluaXNoQlROQ2xhc3N9IG9uQ2xpY2s9eyAoKT0+dGhpcy5maW5pc2hPcmRlcihzdGF0dXMpIH0+e2RhdGEuZmluaXNoQlROVGV4dH08L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBtYXhXaWR0aDogJzcwMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIG1hcmdpbjogJzBweCBhdXRvJyxcbiAgICAgIH0sXG4gICAgICBtYWluU2VnbWVudDoge1xuICAgICAgICB3aWR0aDogJzk1JScsXG4gICAgICAgIG1hcmdpbjogJzBweCBhdXRvJyxcbiAgICAgIH0sXG4gICAgICBidXR0b246IHtcbiAgICAgICAgd2lkdGg6ICcyMDBweCcsXG4gICAgICAgIGhlaWdodDogJzEwMHB4JyxcbiAgICAgICAgbWFyZ2luOiAnMHB4IGF1dG8nLFxuICAgICAgICBsaW5lSGVpZ2h0OiAnNDBweCcsXG4gICAgICAgIGZvbnRTaXplOiAnMzBweCcsXG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgZm9udFNpemU6ICczNXB4JyxcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIH0sXG4gICAgICB0aXRsZTI6IHtcbiAgICAgICAgZm9udFNpemU6ICcyMHB4JyxcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICB9LFxuICAgIH1cblxuICAgIGxldCBtYW5hZ2UgPSB0aGlzLnByb3BzLm1hbmFnZS50b09iamVjdCgpO1xuICAgIGxldCB1bml0ID0gJyc7XG4gICAgbGV0IGl0ZW1zID0gW107XG4gICAgbGV0IHN0YXR1cyA9ICcnO1xuICAgIGxldCBzdGF0dXNWaWV3ID0gJyc7XG4gICAgbGV0IGN1c3RvbWVyID0gJyc7XG4gICAgbGV0IG9yZGVyX3R5cGUgPSAnJztcblxuICAgIGxldCBpc0ZpbmlzaGVkID0gZmFsc2U7XG5cbiAgICBsZXQgZmluaXNoQlROQ2xhc3MgPSAndWkgYnV0dG9uIGdyZWVuJztcbiAgICBsZXQgZmluaXNoQlROVGV4dCA9ICflrozmiJDoqILllq4nO1xuXG4gICAgaWYobWFuYWdlLnJlc3VsdHMub3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdW5pdCA9IG1hbmFnZS5yZXN1bHRzLm9yZGVyLnVuaXQ7XG4gICAgICBzdGF0dXMgPSBtYW5hZ2UucmVzdWx0cy5vcmRlci5zdGF0dXM7XG4gICAgICBzdGF0dXNWaWV3ID0gKHN0YXR1cz09J0ZJTklTSCcpPyflt7LlrozmiJAnOifmnKrlrozmiJAnO1xuICAgICAgY3VzdG9tZXIgPSBtYW5hZ2UucmVzdWx0cy5vcmRlci5jdXN0b21lcjtcbiAgICAgIG9yZGVyX3R5cGUgPSBtYW5hZ2UucmVzdWx0cy5vcmRlci5vcmRlcl90eXBlO1xuXG4gICAgICAkKCcudWkuY2hlY2tib3gnKS5jaGVja2JveCgnc2V0IGVuYWJsZWQnKTtcblxuICAgICAgaWYoc3RhdHVzID09ICdGSU5JU0gnKSB7XG4gICAgICAgIGZpbmlzaEJUTkNsYXNzID0gJ3VpIGJ1dHRvbiByZWQnO1xuICAgICAgICBmaW5pc2hCVE5UZXh0ID0gJ+WPlua2iOWujOaIkOioguWWric7XG4gICAgICAgIGlzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAkKCcudWkuY2hlY2tib3gnKS5jaGVja2JveCgnc2V0IGRpc2FibGVkJyk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZihtYW5hZ2UucmVzdWx0cy5pdGVtcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgaXRlbXMgPSBtYW5hZ2UucmVzdWx0cy5pdGVtcztcblxuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aSBzdGFja2FibGUgdGhyZWUgY29sdW1uIGdyaWQnIHN0eWxlPXsgc3R5bGUuY29udGFpbmVyIH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cnLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jvdyc+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGUubWFpblNlZ21lbnR9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpIHNlZ21lbnQnPlxuXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlLnRpdGxlMn0+55Sz6KuL5Zau5L2NOiZuYnNwO3sgdW5pdCB9PC9kaXY+PGJyLz5cblxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZS50aXRsZTJ9PuioguWWrueLgOaFizombmJzcDt7IHN0YXR1c1ZpZXcgfTwvZGl2Pjxici8+XG5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGUudGl0bGUyfT7nlLPoq4vkuro6Jm5ic3A7eyBjdXN0b21lciB9PC9kaXY+PGJyLz5cblxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZS50aXRsZTJ9PueUs+iri+mgheebrjombmJzcDs8L2Rpdj48YnIvPlxuXG4gICAgICAgICAgICAgIDxJdGVtTGlzdCBpdGVtcz17aXRlbXN9IGlzRmluaXNoZWQ9e2lzRmluaXNoZWR9IG9yZGVyX3R5cGU9e29yZGVyX3R5cGV9Lz48YnIvPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aSBidXR0b24nIG9uQ2xpY2s9eyAoKT0+dGhpcy50b1BhZ2UoJy9hZG1pbicpIH0+5Zue566h55CG6aCB6Z2iPC9kaXY+XG5cbiAgICAgICAgICAgICAge3RoaXMuYWRtaW5SZW5kZXIoe2ZpbmlzaEJUTlRleHQ6ZmluaXNoQlROVGV4dCwgZmluaXNoQlROQ2xhc3M6ZmluaXNoQlROQ2xhc3N9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBPcmRlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JvdXRlcy9BZG1pbi9yb3V0ZXMvT3JkZXIvY29tcG9uZW50cy9PcmRlci5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTs7O0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBR0E7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUNBOztBQUFBO0FBQ0E7O0FBQUE7QUFFQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFFQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFFQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFFQTs7QUFBQTs7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUVBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7OyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }

});