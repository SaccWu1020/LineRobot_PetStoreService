// 載入 express 套件，建立 app 應用程式
const express = require('express')
const app = express()
// 設定 app port 屬性 (Heroku 會檢查有沒有這個變數)
// 如果沒有這個變數 Heroku 會出現 Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch 然後就壞掉了
app.set('port', (process.env.PORT || 5000));

// 載入 Line Api
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk/exceptions').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk/exceptions').SignatureValidationFailed
// 將 AccessToken 和 Secret 組態內容加入 middleware
// 並使用 middleware 初始化 Line 應用程式
app.use(middleware({
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret
}))
// 建立 Line Api 專用的回應路由 (router) 
// 詳情請參考： https://line.github.io/line-bot-sdk-nodejs/pages/guide/webhook.html
app.post('/webhook', (req, res) => {
  res.json(req.body.events) // req.body will be webhook event object
})

// 應用程式在執行過程中如果有任何錯誤
// 將由此 function 來處理
app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature);
    return;
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw);
    return;
  }
  next(err); // will throw default 500
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});