const express = require('express')
const router = express.Router()
const FB = require('fb')
const fetch = require('node-fetch')
require('dotenv').config()

const cache = require('../cache')

const data = require('../data/galleryIDs')
const galleryIDs = data.galleryIDs
const fakeID = data.fakeID

const baseURL = 'https://graph.facebook.com/'
const APP_SECRET = process.env.APP_SECRET
const FB_ID = process.env.FB_ID
const FAKE_FB_ID = process.env.FAKE_FB_ID
const FAKE_APP_SECRET = process.env.FAKE_APP_SECRET

const accessToken = process.env.APP_ID + '|' + process.env.APP_SECRET

const URLsuffix = `&access_token=${FB_ID}|${APP_SECRET}`

const pageFields = [
  'id',
  'name',
  'about',
  'bio',
  'cover',
  'description',
  'current_location',
  'contact_address',
  'emails',
  'features',
  'general_info',
  'hours',
  'link',
  'location',
  'mission',
  'website',
]
const pageFieldsQS =
  `?fields=${pageFields.join(',')}`

const testFieldsQS = '?fields=id,name,events{cover,end_time,id,event_times,start_time,place,owner,name,description},about,description,mission,location,cover'

router.get('/', cache(10000), async (req, res) => {
  FB.setAccessToken(accessToken)

  const methods = Object.keys(galleryIDs).map(key => (
    { method: 'get', relative_url: `${galleryIDs[key]}${pageFieldsQS}` }
  ))
  
  const data = await FB.api('', 'post', { batch: methods })

  return res.json(data)
})

router.get('/test', (req, res) => {
  const getGalleryInfo = (() => {
    const URL = `${baseURL}${fakeID}/${testFieldsQS}${fakeURLsuffix}`
    return fetch(URL)
      .then(res => res.json())
      .then(json => res.json(json))
      .catch(err => {
      console.log(err)
      return err
    })
  })()

  
  return getGalleryInfo
})

module.exports = router
