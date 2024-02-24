// const path = require('path')

function get404(req, res) {
  res.status(404).json({
    msg: 'Invalid route'
  })

  //res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
}

module.exports = { get404 }