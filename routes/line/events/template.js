module.exports = function (line) {

    line.on(line.Event.MESSAGE, {x: 1, y: 2}, function (data, req, res) {
        return {
            "type": "template",
            "altText": "讀書會寵物店服務項目",
            "template": {
                "type": "carousel",
                "columns": [                {
                    "thumbnailImageUrl": "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/quizzes/pet_dander_quiz/493x335_pet_dander_quiz.jpg",
                    "title": "基本查詢",
                    "text": "請選擇要查詢的項目",
                    "actions": [
                        {
                            "type": "uri",
                            "label": "Facebook官方粉絲團",
                            "uri": "https://www.facebook.com"
                        },
                        {
                            "type": "postback",
                            "label": "查詢服務時間",
                            "data": "act=search&data=service_time"
                        },
                        {
                            "type": "postback",
                            "label": "查詢本日營業狀態",
                            "data": "act=search&data=tody"
                        },
                        {
                            "type": "postback",
                            "label": "服務地址",
                            "data": "act=search&data=address"
                        },
                        {
                            "type": "postback",
                            "label": "電話聯絡我們",
                            "data": "act=tel"
                        }
                    ]
                },
                {
                    "thumbnailImageUrl": "https://www.petfinder.com/wp-content/uploads/2013/05/120251710-632x3531.jpg",
                    "title": "毛小孩服務",
                    "text": "請選擇要服務的項目",
                    "actions": [
                        {
                            "type": "postback",
                            "label": "預約服務",
                            "data": "act=reservation"
                        },
                        {
                            "type": "postback",
                            "label": "進度查詢",
                            "data": "act=process"
                        }
                    ]
                }
                ]
            }
        }
    })
}
