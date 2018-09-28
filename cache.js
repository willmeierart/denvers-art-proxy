const mcache = require('memory-cache')

const cache = duration => (req, res, next) => {
  const key = 'data'
  const cachedBody = mcache.get(key)
  if (cachedBody) {
    res.send(cachedBody)
    console.log('USING CACHE')
    return
  } else {
    res.sendResponse = res.send
    res.send = body => {
      mcache.put(key, body, duration * 1000)
      res.sendResponse(body)
    }
    next()
  }
}

module.exports = cache
