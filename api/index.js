const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
require('dotenv').config()

const galleryIDs = require('../data/galleryIDs')

const baseURL = 'https://graph.facebook.com/'
const APP_SECRET = process.env.APP_SECRET
const FB_ID = process.env.FB_ID
const URLsuffix = `&access_token=${FB_ID}|${APP_SECRET}`
const pageFields = '?fields=id,about,cover,description,location,mission,name,website'
const eventFields = '/events?fields=owner,name,id,cover,description,place,start_time,end_time'

// endpoint?key=value

router.get('/', function(req, res) {
  const getFBdata=(()=>{
    const data = []
    for (let gallery in galleryIDs){
      let pageID = galleryIDs[gallery]

      const getGalleryInfo=(async()=>{
        const URL1 = `${baseURL}${pageID}/${pageFields}${URLsuffix}`
        const URL2 = `${baseURL}${pageID}/${eventFields}${URLsuffix}`

        const pageData = await fetch(URL1).then(res=>res.json())
        const eventData = await fetch(URL2).then(res=>res.json())
        data.push({pageData, eventData})
        // return pageData
        console.log(data);
        
      })()
    }
  })()
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
