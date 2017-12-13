const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// const index = require('./routes/index')
// const users = require('./routes/users')
const question=require('./routes/question')
const cors=require('koa2-cors')
const router=require('koa-router')()
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
    console.log(`-->begin${start}`)
    console.log(ctx.method,ctx.url)
    console.log(`<--end${new Date()}`)
  console.log(`----useTime ${ms}ms`)
})
//跨域
app.use(cors({
    allowedMethods:['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
// routes
router.use('/question',question.routes(),question.allowedMethods())
app.use(router.routes(),router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
