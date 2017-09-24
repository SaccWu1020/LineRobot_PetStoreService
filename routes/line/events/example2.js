module.exports = function (line) {

    line.on(line.Event.MESSAGE, {x: 1, y: 2}, function (data, req, res) {
        return [
            {
              type: 'text',
              text: 'Hi, this is a message from example2.js'
            },
            {
              type: 'text',
              text: 'and send 2 times.'
            }
        ]
    })
}

module.exports.debug = true