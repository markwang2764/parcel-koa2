const Router = require('koa-router')
const { resolve } = require('path')
const _ = require('lodash')
const glob = require('glob')
const symbolPrefix = Symbol('prefix')
const routerMap = new Map()
const isArray = c => _.isArray(c) ? c : [c]

export class Route {
  constructor (app,apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }
  init() {
    // 初始化所有路由文件
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)
    // 遍历Map内的所有路由和方法 执行koa-router
    for(let [conf, controller] of routerMap) {
      const controllers = isArray(controller)
      const prefixPath = conf.target[symbolPrefix]
      if(prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path
      // 下面这段等价于 router.get/post(routerPath,function(){}) 中间件funciotn可以是多个 所以用了扩展运算符
      this.router[conf.method](routerPath, ...controllers)
    }
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}
const normalizePath = path => path.startsWith('/')?path:`/${path}`
const router = conf => (target,key,descriptor) => {
  conf.path = normalizePath(conf.path)
  routerMap.set({
    target:target,
    ...conf
  }, target[key])
}

export const controller = path => target => (target.prototype[symbolPrefix] = path)
export const get = path => router({
  method: 'get',
  path: path
})
export const post = path => router({
  method: 'post',
  path: path
})
export const put = path => router({
  method: 'put',
  path: path
})
export const del = path => router({
  method: 'del',
  path: path
})
export const use = path => router({
  nethod: 'use',
  path: path
})
export const all = path => router({
  method: 'all',
  path: path
})