module.exports = {
  path: 'item/:name',

  getChildRoutes(location, cb) {
    require.ensure([], (require)=>{
      cb(null, [
      ])
    })
  },

  getComponents(location, cb) {
    require.ensure([], (require)=>{
      cb(null, require('./components/Item'));
    })
  },
}
