module.exports = {

  getChildRoutes(location, cb) {
    require.ensure([], (require)=>{
      cb(null, [
      ])
    })
  },

  getComponents(location, cb) {
    require.ensure([], (require)=>{
      cb(null, require('./components/Manage'));
    })
  },
}
