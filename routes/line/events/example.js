module.exports = function (line) {

    line.on(line.Event.MESSAGE, {x: 1, y: 2}, function (data, req, res) {
        return {
          type: 'text',
          text: 'Hi, this is a message from example.js'
        }
    })
}

module.exports.debug = true