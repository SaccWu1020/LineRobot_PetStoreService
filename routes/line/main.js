// 載入組態檔
require('dotenv').config()

// 載入 express 套件，建立 app 應用程式
const express = require('express')
const app = express()

// 載入 Line Api
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk/exceptions').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk/exceptions').SignatureValidationFailed

function LineAppMain () {
  // 將 AccessToken 和 Secret 組態內容加入 middleware
  // 並使用 middleware 初始化 Line 應用程式
  app.use(middleware({
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
  }))

  // Line應用程式在執行過程中如果有任何錯誤，將由此 function 來處理
  app.use((err, req, res, next) => {
    if (err instanceof SignatureValidationFailed) {
      res.status(401).send(err.signature)
      return
    } else if (err instanceof JSONParseError) {
      res.status(400).send(err.raw)
      return
    }
    next(err) // will throw default 500
  })

  // 事件註冊陣列
  this.events = {}
}

// 事件註冊機
LineAppMain.prototype.on = function (event_name) {
  // 驗證 arguments 數量與正確性
  if(arguments.length === 1) {
    throw "arguments length less then 2."
  }
  else if (typeof event_name !== "string") {
    throw "event_name is not string."
  }
  else if (arguments.length === 2 && typeof arguments[1] !== "function"
        || arguments.length === 3 && typeof arguments[2] !== "function") {
    throw "handle is not function."
  }
  // 註冊事件
  if(this.events[event_name] === undefined) {
    this.events[event_name] = []
  }
  this.events[event_name].push({
    data: (arguments.length === 3) ? arguments[1] || {} : {},
    handle: (arguments.length === 3) ? arguments[2] : arguments[1]
  })
}

var main = module.exports = new LineAppMain()

// 建立 Line Api 專用的回應路由 (router) 
// 詳情請參考： https://line.github.io/line-bot-sdk-nodejs/pages/guide/webhook.html
module.exports.webhook = require('./webhook').bind(main)