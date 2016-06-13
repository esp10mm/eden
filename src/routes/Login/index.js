module.exports = {
  path: 'login',

  getChildRoutes(location, cb) {
    require.ensure([], (require)=>{
      cb(null, [
      ])
    })
  },

  getComponents(location, cb) {
    require.ensure([], (require)=>{
      cb(null, require('./components/Login'));
    })
  },
}
