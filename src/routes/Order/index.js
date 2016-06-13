module.exports = {
  path: 'order/:id',

  // getIndexRoute(location, cb) {
  //   require([], (require)=>{
  //     cb(null, require('./routes/Manage'))
  //   })
  // },

  // getChildRoutes(location, cb) {
  //   require.ensure([], (require)=>{
  //     cb(null, [
  //       require('./routes/Item'),
  //       require('./routes/Order'),
  //     ])
  //   })
  // },

  getComponents(location, cb) {
    require.ensure([], (require)=>{
      cb(null, require('./components/Order'));
    })
  },
}
