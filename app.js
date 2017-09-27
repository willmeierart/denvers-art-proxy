const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const index = require('./api/index')
const cors = require('cors')
const app = express()

app.use(cors({
  credentials: true,
  origin:'*'}
))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)

app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })

  res.render('error')
})

module.exports = app
