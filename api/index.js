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
// const fakeURLsuffix = `&access_token=${process.env.FAKE_APP_SECRET}`

const pageFields = '?fields=id,about,cover,description,location,mission,name,website'
const eventFields = '/events?fields=owner,name,id,cover,description,place,start_time,end_time'
const allFields = '?fields=id,name,events{cover,end_time,id,event_times,start_time,place,owner,name,description},about,description,mission,location,cover'

// endpoint?key=value



router.get('/', cache(1000), async (req, res) => {
  FB.setAccessToken(accessToken)

  const methods = Object.keys(galleryIDs).map(key => (
    { method: 'get', relative_url: `${galleryIDs[key]}${pageFields}` }
  ))
  
  const data = await FB.api('', 'post', { batch: methods })

  console.log(data)

  return res.json(data)
  // const getFBdata=(()=>{
  //   const data = []
  //     for (let gallery in galleryIDs){
  //       let pageID = galleryIDs[gallery]

  //       const getGalleryInfo=(async()=>{
  //         const URL1 = `${baseURL}${pageID}/${pageFields}${URLsuffix}`
  //         const URL2 = `${baseURL}${pageID}/${eventFields}${URLsuffix}`

  //         const pageData = await fetch(URL1).then(res=>res.json()).catch(err => { console.log(err) })
  //         console.log(pageData.error)
  //         const eventData = await fetch(URL2).then(res=>res.json())
  //         console.log(eventData.error)
  //         data.push({pageData, eventData})
  //         // return pageData
  //         // console.log(data);
  //       })()
  //     }
  // })()
  // return data
})

router.get('/test', (req, res) => {
  // const getGalleryInfo = async (() => {
  //   const data = []

  //   const URL = `${baseURL}${fakeID}/${allFields}${fakeURLsuffix}`

  //   const returnedData = await fetch(URL).then(res => res.json()).catch(err => {
  //     console.log(err)
  //     return
  //   })

  //   const { id, name, cover, about, location } = returnedData

  //   const pageData = { id, name, cover, about, location }

  //   const { events } = returnedData
  //   data.push({ pageData, eventData: events.data })
  //   console.log(data)
  //   return JSON.stringify({ data })
  // })()
  const getGalleryInfo = (() => {
    const URL = `${baseURL}${fakeID}/${allFields}${fakeURLsuffix}`
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
// router.get('/page/:id', function(req, res) {
//
// })

module.exports = router


// for(let page in pageIds){
//             let id = pageIds[page]
//             const promise1 = new Promise(function(resolve, reject) {
//                 FB.api(
//                     "/" + id + "?fields=id,about,cover,description,location,mission,name,website",
//                     function(response) {
//                         resolve(response)
//                     }
//                 )
//             })
//             const promise2 = new Promise(function(resolve, reject) {
//                 FB.api(
//                     "/" + id + "/events?fields=owner,name,id,cover,description,place,start_time,end_time",
//                     function(events) {
//                         resolve(events.data)
//                     })
//             })
//             const pagePromise = Promise.all([promise1, promise2]);
//             allPages.push(pagePromise)
//         }
//         Promise.all(allPages).then(function(galleryWithEvents) {
//             filterCurrentEvents(galleryWithEvents)
//         })
