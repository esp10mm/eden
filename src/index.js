import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/App'
import configureStore from './store/configureStore'
import './semantic/dist/semantic.min.js'

const store = configureStore();

const rootRoute = {
  component: 'div',
  childRoutes: [
    {
      path: '/table/:ids',
      component: require('./components/Table')
    },
    {
      path: '/statistics/:year',
      component: require('./components/Statistics')
    },
    {
      path: '/',
      component: require('./components/App'),
      indexRoute: {
        component: require('./routes/Home'),  
      },
      childRoutes: [
        require('./routes/Admin'),
        require('./routes/Service'),
        require('./routes/Login'),
        require('./routes/Order'),
        { path:'*', component: require('./routes/Home'), },
      ],
    },
  ]
}

render(
  <Provider store={ store  }>
  <Router history={ browserHistory } routes={ rootRoute }/>
  </Provider>,
  document.getElementById('root')
)
