module.exports = {
  path: 'admin',

  getIndexRoute(location, cb) {
    require([], (require)=>{
      cb(null, require('./routes/Manage'))
    })
  },

  getChildRoutes(location, cb) {
    require.ensure([], (require)=>{
      cb(null, [
        require('./routes/Item'),
      ])
    })
  },

  getComponents(location, cb) {
    require.ensure([], (require)=>{
      cb(null, require('./components/Admin'));
    })
  },
}
