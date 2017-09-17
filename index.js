const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk/exceptions').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk/exceptions').SignatureValidationFailed
var env = require('dotenv').config();

const app = express()
app.set('port', (process.env.PORT || 5000));

const config = {
  channelAccessToken: process.env.channelAccessToken || env.parsed.channelAccessToken,
  channelSecret: process.env.channelSecret || env.parsed.channelSecret
}
console.log(config);

app.use(middleware(config))

app.get('/', (req, res) => {
  res.end();
})

// 詳情請參考： https://line.github.io/line-bot-sdk-nodejs/pages/guide/webhook.html
app.post('/webhook', (req, res) => {
  res.json(req.body.events) // req.body will be webhook event object
})

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