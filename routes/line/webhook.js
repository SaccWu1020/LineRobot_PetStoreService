// 建立 Line Api 專用的回應路由 (router) 
// 詳情請參考： https://line.github.io/line-bot-sdk-nodejs/pages/guide/webhook.html
// 載入 line app 主程式
const LineAppMain = require('./main')
const _ = require('underscore')

module.exports = function (req, res) {
    if(req.body && req.body.events) {
        var line_app_main_events = LineAppMain.GetEvents();
        for(var event of req.body.events) {
            if(line_app_main_events[event.type] instanceof Array) {
                var reply_messages = _.map(line_app_main_events[event.type], (o)=>o.handle.call(event, {params: o.data}, req, res))
                    reply_messages = _.flatten(reply_messages)
                    reply_messages = _.without(reply_messages, undefined, false, null) 
                    reply_messages = _.filter(reply_messages, (o)=>JSON.stringify(o)!==JSON.stringify({})) 
                if(reply_messages.length > 0) {
                    LineAppMain.client.replyMessage(event.replyToken, reply_messages)
                }
            }
        }
        // req.body will be webhook event object
        res.json(req.body.events) 
    }
    res.end()
}