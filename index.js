const app = require('./express_app_instance')
// 設定 app port 屬性 (Heroku 會檢查有沒有這個變數)
// 如果沒有這個變數 Heroku 會出現 Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch 然後就壞掉了
app.set('port', (process.env.PORT || 5000));

// 建立 Line Api 專用的回應路由 (router) 
// 詳情請參考： https://line.github.io/line-bot-sdk-nodejs/pages/guide/webhook.html
app.post('/webhook', require('./routes/line/webhook'))

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});