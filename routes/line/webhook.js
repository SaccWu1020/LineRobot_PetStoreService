// 建立 Line Api 專用的回應路由 (router) 
// 詳情請參考： https://line.github.io/line-bot-sdk-nodejs/pages/guide/webhook.html
// 載入 line app 主程式
const LineAppMain = require('./main')

module.exports = function (req, res) {
    if(req.body && req.body.events) {
        var line_app_main_events = LineAppMain.GetEvents();
        for(var event of req.body.events) {
            if(line_app_main_events[event.type] && line_app_main_events[event.type].length > 0) {
                for(var obj of line_app_main_events[event.type]) {
                    try {
                        obj.handle.call(event, {params: obj.data}, req, res);
                    }
                    catch(exception) {
                        console.log(exception);
                    }
                }
            }
        }
        // req.body will be webhook event object
        res.json(req.body.events) 
    }
    res.end()
}