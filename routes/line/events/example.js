module.exports = function (main) {
    main.on("message", {x: 1, y: 2}, function (data, req, res) {
        console.log("=====印出來自你傳入的變數物件=====")
        console.log(data.params) // {x: 1, y: 2}
        console.log("=====印出 event 物件=====")
        console.log(this); // event from webhook
    });
}