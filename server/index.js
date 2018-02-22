const Koa= require('koa')
const { resolve } = require('path')
const views = require('koa-views')

// const { htmlTpl, ejsTpl, pugTpl } = require('./tpl')
// const ejs = require('ejs')
// const pug = require('pug')

// const mongoose = require('mongoose')
// const { connect,initSchemas } = require('./database/init')

// ;(async function() {
//   await connect()
//    initSchemas()
//    const Movie = mongoose.model('Movie')
//    const movies = await Movie.find({})
// }())

app.use(views(resolve(__dirname,'./views'),{
  extension: 'pug'
}))
app.use(async(ctx,next)=>{
  ctx.type = 'text/html; charset=urf-8'
  await ctx.render('index',{
    you: 'Luke',
    me: 'dsadsa'
  })
})
app.listen(2333)
