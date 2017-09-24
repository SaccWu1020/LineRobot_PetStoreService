// 載入組態檔
require('dotenv').config()
// 載入 express 套件，建立 app 應用程式
const app = require('../../express_app_instance')
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

  // line app sdk instance
  const line = require('@line/bot-sdk')
  this.client = new line.Client({
    channelAccessToken: process.env.channelAccessToken
  })

  // 事件註冊陣列
  this._events = {}
  this.Event = {
    USER: "user",
    GROUP: "group",
    ROOM: "room",
    MESSAGE: "message",
    FOLLOW: "follow",
    UNFOLLOW: "unfollow",
    JOIN: "join",
    LEAVE: "leave",
    POSTBACK: "postback",
    BEACON: "beacon"
  }
}

// 事件註冊機
LineAppMain.prototype.GetEvents = function () {
  return this._events;
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
  if(this._events[event_name] === undefined) {
    this._events[event_name] = []
  }
  this._events[event_name].push({
    data: (arguments.length === 3) ? arguments[1] || {} : {},
    handle: (arguments.length === 3) ? arguments[2] : arguments[1]
  })
}

var main = module.exports = new LineAppMain()

// 載入大家撰寫的事件
var normalizedPath = require("path").join(__dirname, "events");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  var func = require("./events/" + file)
  if(typeof func === "function") {
    if(!func.debug || func.debug && process.env.DEBUG) {
      console.log("requrie ./events/" + file)
      func(main);
    }
  }
  else {
    throw func + " not a function";
  }
});