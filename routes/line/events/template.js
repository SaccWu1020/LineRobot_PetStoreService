module.exports = function (line) {
    line.on(line.Event.MESSAGE, {x: 1, y: 2}, function (data, req, res) {
        return {
            "type": "template",
            "altText": "讀書會寵物店服務項目",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                        "thumbnailImageUrl": "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/quizzes/pet_dander_quiz/493x335_pet_dander_quiz.jpg",
                        "title": "基本查詢",
                        "text": "請選擇要查詢的項目",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "查詢服務時間",
                                "data": "action=buy&itemid=111"
                            },
                            {
                                "type": "postback",
                                "label": "服務地址",
                                "data": "action=buy&itemid=111"
                            },
                            {
                                "type": "postback",
                                "label": "與我們聯絡",
                                "data": "action=add&itemid=111"
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
                            "data": "action=buy&itemid=222"
                        },
                        {
                            "type": "postback",
                            "label": "進度查詢",
                            "data": "action=add&itemid=222"
                        },
                        {
                            "type": "postback",
                            "label": " ",
                            "data": "action=add&itemid=222"
                        }
                        ]
                    },
                    {
                        "thumbnailImageUrl": "https://image.freepik.com/vetores-gratis/pet-icones-embalar_23-2147498918.jpg",
                        "title": "毛小孩服務",
                        "text": "請選擇要服務的項目",
                        "actions": [
                        {
                            "type": "uri",
                            "label": "Facebook",
                            "uri": "https://www.facebook.com"
                        },
                        {
                            "type": "postback",
                            "label": " ",
                            "data": "action=add&itemid=222"
                        },
                        {
                            "type": "postback",
                            "label": " ",
                            "data": "action=add&itemid=222"
                        }
                        ]
                    }
                ]
            }
        }
    })
}
