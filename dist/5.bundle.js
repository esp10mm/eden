webpackJsonp([5],{

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function($) {'use strict';\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouter = __webpack_require__(10);\n\nvar Login = _react2['default'].createClass({\n  displayName: 'Login',\n\n  componentDidMount: function componentDidMount() {\n    $('.main').transition('fade');\n\n    $('.password, .account').keyup(function (event) {\n      if (event.keyCode == 13) $('.login.button').click();\n    }).focus(function () {\n      $('.icon.input').removeClass('error');\n      $('.account, .password').attr('placeholder', '');\n    });\n  },\n\n  componentWillReceiveProps: function componentWillReceiveProps(newProps) {\n    $('.icon.input').removeClass('loading');\n    $('.account, .password').val('');\n\n    if (newProps.auth.login) {\n      $('.main').transition('fade');\n\n      setTimeout(function () {\n        _reactRouter.browserHistory.push('/admin');\n      }, 500);\n    } else {\n      $('.icon.input').addClass('error');\n\n      switch (newProps.auth.msg) {\n        case 'LOGIN_FAILED':\n          $('.account, .password').attr('placeholder', '帳號或密碼錯誤');\n          break;\n      }\n    }\n  },\n\n  loginSubmit: function loginSubmit() {\n    var account = $('.account').val();\n    var password = $('.password').val();\n    $('.account, .password').blur();\n    $('.icon.input').addClass('loading');\n    this.props.func.login(account, password);\n  },\n\n  toHomePage: function toHomePage() {\n    $('.main').transition('fade');\n\n    setTimeout(function () {\n      _reactRouter.browserHistory.push('/');\n    }, 500);\n  },\n\n  render: function render() {\n    var style = {\n      container: {\n        maxWidth: '700px',\n        height: '100%',\n        margin: '0px auto'\n      },\n      title: {\n        fontSize: '50px',\n        color: 'black',\n        margin: '0px auto',\n        display: 'block'\n      },\n      formContainer: {\n        margin: '0px auto'\n      },\n      formLabel: {\n        fontSize: '20px',\n        textAlign: 'left',\n        marginBottom: '5px'\n      },\n      button: {\n        textShadow: '#707070 0.05px 0.05px 0.05px',\n        fontFamily: 'Arial,\"Microsoft YaHei\"',\n        fontWeight: '400'\n      }\n    };\n\n    return _react2['default'].createElement(\n      'div',\n      { className: 'ui stackable three column grid', style: style.container },\n      _react2['default'].createElement('div', { className: 'ui row' }),\n      _react2['default'].createElement(\n        'div',\n        { className: 'ui row' },\n        _react2['default'].createElement(\n          'div',\n          { className: 'main', style: style.title },\n          '登入'\n        )\n      ),\n      _react2['default'].createElement(\n        'div',\n        { className: 'ui row' },\n        _react2['default'].createElement(\n          'div',\n          { className: 'ui main center compact aligned segment', style: style.formContainer },\n          _react2['default'].createElement(\n            'div',\n            { className: 'ui form' },\n            _react2['default'].createElement(\n              'div',\n              { className: 'field', style: style.formLabel },\n              '帳號:'\n            ),\n            _react2['default'].createElement('div', { className: 'field' }),\n            _react2['default'].createElement(\n              'div',\n              { className: 'field' },\n              _react2['default'].createElement(\n                'div',\n                { className: 'ui icon input' },\n                _react2['default'].createElement('input', { className: 'account', type: 'text' }),\n                _react2['default'].createElement('i', { className: 'icon' })\n              )\n            ),\n            _react2['default'].createElement('div', { className: 'field' }),\n            _react2['default'].createElement(\n              'div',\n              { className: 'field', style: style.formLabel },\n              '密碼:'\n            ),\n            _react2['default'].createElement('div', { className: 'field' }),\n            _react2['default'].createElement(\n              'div',\n              { className: 'field' },\n              _react2['default'].createElement(\n                'div',\n                { className: 'ui icon input' },\n                _react2['default'].createElement('input', { className: 'password', type: 'password' }),\n                _react2['default'].createElement('i', { className: 'icon' })\n              )\n            ),\n            _react2['default'].createElement('div', { className: 'field' })\n          ),\n          _react2['default'].createElement(\n            'div',\n            { className: 'ui login button', style: style.button, onClick: this.loginSubmit },\n            '登入'\n          ),\n          _react2['default'].createElement(\n            'div',\n            { className: 'ui home button', style: style.button, onClick: this.toHomePage },\n            '回主頁'\n          )\n        )\n      ),\n      _react2['default'].createElement('div', { className: 'ui row' })\n    );\n  }\n});\n\nmodule.exports = Login;\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTYxLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9Mb2dpbi9jb21wb25lbnRzL0xvZ2luLmpzP2EwNDIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYnJvd3Nlckhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5cbmNvbnN0IExvZ2luID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAkKCcubWFpbicpLnRyYW5zaXRpb24oJ2ZhZGUnKTtcbiAgICBcbiAgICAkKCcucGFzc3dvcmQsIC5hY2NvdW50Jykua2V5dXAoKGV2ZW50KT0+e1xuICAgICAgaWYoZXZlbnQua2V5Q29kZSA9PSAxMylcbiAgICAgICAgJCgnLmxvZ2luLmJ1dHRvbicpLmNsaWNrKCk7XG4gICAgfSlcbiAgICAuZm9jdXMoKCk9PntcbiAgICAgICQoJy5pY29uLmlucHV0JykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAkKCcuYWNjb3VudCwgLnBhc3N3b3JkJykuYXR0cigncGxhY2Vob2xkZXInLCAnJyk7XG4gICAgfSlcbiAgfSxcblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgJCgnLmljb24uaW5wdXQnKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICQoJy5hY2NvdW50LCAucGFzc3dvcmQnKS52YWwoJycpO1xuXG4gICAgaWYobmV3UHJvcHMuYXV0aC5sb2dpbikge1xuICAgICAgJCgnLm1haW4nKS50cmFuc2l0aW9uKCdmYWRlJyk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgYnJvd3Nlckhpc3RvcnkucHVzaCgnL2FkbWluJyk7XG4gICAgICB9LCA1MDApXG4gICAgfVxuXG4gICAgZWxzZSB7XG4gICAgICAkKCcuaWNvbi5pbnB1dCcpLmFkZENsYXNzKCdlcnJvcicpO1xuXG4gICAgICBzd2l0Y2gobmV3UHJvcHMuYXV0aC5tc2cpIHtcbiAgICAgICAgY2FzZSAnTE9HSU5fRkFJTEVEJzpcbiAgICAgICAgICAkKCcuYWNjb3VudCwgLnBhc3N3b3JkJykuYXR0cigncGxhY2Vob2xkZXInLCAn5biz6Jmf5oiW5a+G56K86Yyv6KqkJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGxvZ2luU3VibWl0KCkge1xuICAgIHZhciBhY2NvdW50ID0gJCgnLmFjY291bnQnKS52YWwoKTsgICAgICBcbiAgICB2YXIgcGFzc3dvcmQgPSAkKCcucGFzc3dvcmQnKS52YWwoKTsgICAgICBcbiAgICAkKCcuYWNjb3VudCwgLnBhc3N3b3JkJykuYmx1cigpO1xuICAgICQoJy5pY29uLmlucHV0JykuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICB0aGlzLnByb3BzLmZ1bmMubG9naW4oYWNjb3VudCwgcGFzc3dvcmQpO1xuICB9LFxuXG4gIHRvSG9tZVBhZ2UoKSB7XG4gICAgJCgnLm1haW4nKS50cmFuc2l0aW9uKCdmYWRlJyk7XG5cbiAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICBicm93c2VySGlzdG9yeS5wdXNoKCcvJyk7XG4gICAgfSwgNTAwKVxuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSB7XG4gICAgICBjb250YWluZXI6IHtcbiAgICAgICAgbWF4V2lkdGg6ICc3MDBweCcsXG4gICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICBtYXJnaW46ICcwcHggYXV0bycsXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgZm9udFNpemU6ICc1MHB4JyxcbiAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgIG1hcmdpbjogJzBweCBhdXRvJyxcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIH0sXG4gICAgICBmb3JtQ29udGFpbmVyOiB7XG4gICAgICAgIG1hcmdpbjogJzBweCBhdXRvJyxcbiAgICAgIH0sXG4gICAgICBmb3JtTGFiZWw6IHtcbiAgICAgICAgZm9udFNpemU6ICcyMHB4JyxcbiAgICAgICAgdGV4dEFsaWduOiAnbGVmdCcsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogJzVweCcsXG4gICAgICB9LFxuICAgICAgYnV0dG9uOiB7XG4gICAgICAgIHRleHRTaGFkb3c6ICcjNzA3MDcwIDAuMDVweCAwLjA1cHggMC4wNXB4JyxcbiAgICAgICAgZm9udEZhbWlseTogJ0FyaWFsLFwiTWljcm9zb2Z0IFlhSGVpXCInLFxuICAgICAgICBmb250V2VpZ2h0OiAnNDAwJyxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aSBzdGFja2FibGUgdGhyZWUgY29sdW1uIGdyaWQnIHN0eWxlPXsgc3R5bGUuY29udGFpbmVyIH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aSByb3cnLz4gICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aSByb3cnPiAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWFpbicgc3R5bGU9eyBzdHlsZS50aXRsZSB9PlxuICAgICAgICAgICAg55m75YWlXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndWkgcm93Jz4gICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpIG1haW4gY2VudGVyIGNvbXBhY3QgYWxpZ25lZCBzZWdtZW50JyBzdHlsZT17IHN0eWxlLmZvcm1Db250YWluZXIgfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aSBmb3JtJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZpZWxkJyBzdHlsZT17IHN0eWxlLmZvcm1MYWJlbCB9PlxuICAgICAgICAgICAgICAgIOW4s+iZnzpcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmaWVsZCcvPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmllbGQnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1aSBpY29uIGlucHV0Jz5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J2FjY291bnQnIHR5cGU9J3RleHQnLz5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT0naWNvbicvPiBcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmaWVsZCcvPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmllbGQnIHN0eWxlPXsgc3R5bGUuZm9ybUxhYmVsIH0+XG4gICAgICAgICAgICAgICAg5a+G56K8OlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZpZWxkJy8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmaWVsZCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpIGljb24gaW5wdXQnPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT0ncGFzc3dvcmQnIHR5cGU9J3Bhc3N3b3JkJy8+XG4gICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J2ljb24nLz4gXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmllbGQnLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpIGxvZ2luIGJ1dHRvbicgc3R5bGU9eyBzdHlsZS5idXR0b24gfSBvbkNsaWNrPXsgdGhpcy5sb2dpblN1Ym1pdCB9PlxuICAgICAgICAgICAgICDnmbvlhaVcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpIGhvbWUgYnV0dG9uJyBzdHlsZT17IHN0eWxlLmJ1dHRvbiB9IG9uQ2xpY2s9eyB0aGlzLnRvSG9tZVBhZ2UgfT5cbiAgICAgICAgICAgICAg5Zue5Li76aCBICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VpIHJvdycvPiAgICAgICBcbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBMb2dpbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JvdXRlcy9Mb2dpbi9jb21wb25lbnRzL0xvZ2luLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUNBOztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFBQTtBQUNBOztBQUFBO0FBQ0E7O0FBQUE7QUFDQTs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBQUE7QUFDQTs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBQUE7QUFDQTs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBOztBQUVBO0FBQ0E7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }

});