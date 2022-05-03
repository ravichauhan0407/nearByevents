const express=require('express')
const authController=require('../controllers/auth')
const eventController=require('../controllers/event')
const router=express.Router()

const {userById}=require('../controllers/user')
router.param("userId",userById);
router.post('/add-Event/:userId',authController.requireSignin,authController.isAuth,eventController.addEvent)

router.get('/get-uppcomming-Events/',eventController.getUpcommingEvent)

router.get('/get-past-Events/',eventController.getPastEvent)

router.get('/get-live-Events/',eventController.getLiveEvent)

router.get('/get-Event/:id',eventController.getEvent)

router.get('get-all-Event/:userId')


module.exports=router