const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const index = require('./api/index')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3010

app.use(cors({
  credentials: true,
  origin:'*'}
))
.use(logger('dev'))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))
.use(cookieParser())
.use(express.static(path.join(__dirname, 'public')))
.use('/', index)
.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
})
// .use(function(err, req, res, next) {
//   res.status(err.status || 500)
//   res.json({
//     message: err.message,
//     error: req.app.get('env') === 'development' ? err : {}
//   })

//   res.render('error')
// })
.listen(port, err => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
