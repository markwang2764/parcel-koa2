const Koa= require('koa')
const { resolve } = require('path')
const views = require('koa-views')
const mongoose = require('mongoose')
const { connect,initSchemas } = require('./database/init')
const R = require('ramda')
const MIDDLEWARES = ['router']

const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        h => h(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

async function start() {
  await connect()
  initSchemas()
  //  require('./tasks/movie')
  // await initAdmin()
  const app = new Koa()
  await useMiddlewares(app)
  app.listen(4455)
}
start()

// app.use(views(resolve(__dirname,'./views'),{
//   extension: 'pug'
// }))


