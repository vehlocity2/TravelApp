const express = require('express')
const verifyToken = require('../Middlewares/ValidateToken')
const { getHotel, createAdminTrip, getTripInfo, getAllTrips, updateTrip, deleteTrip, likeTrip, getHotelDetail, getUserTrips } = require('../Controller/tripController')
const AdminProtect = require('../Middlewares/protectedUser')
const { multipleUpload } = require('../multer/MulterImage')
const router = express.Router()

router.get('/hotels/:city', verifyToken, getHotel)
router.get('/hotel/detail/', verifyToken, getHotelDetail)
router.post('/admin/trips', verifyToken,  multipleUpload, createAdminTrip)
router.get('/trips', verifyToken, getAllTrips)
router.get('/trip/:id', verifyToken, getTripInfo)
router.put('/admin/trip/:id', verifyToken,  multipleUpload, updateTrip)
router.delete('/admin/trip/:id', verifyToken,  deleteTrip)
router.patch('/trip/like/:id', verifyToken, likeTrip)
router.get('/trips/user/:userId', verifyToken, getUserTrips)

module.exports = router