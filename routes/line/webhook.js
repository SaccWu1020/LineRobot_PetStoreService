module.exports = function (req, res) {
    if(req.body && req.body.events) {
        for(var i in req.body.events) {
            console.log(i)
        }
        // req.body will be webhook event object
        res.json(req.body.events) 
    }
    res.end()
}