const express=require('express')
const authController=require('../controllers/auth.js')
const {body}=require('express-validator')
const router=express.Router()
const signupValidators=
[
   body('name').notEmpty().withMessage('Name length should be at least 8'),
   body('email').isEmail().withMessage('Enter valid email'),
   body('password').isLength({min:8}).withMessage('Password length should be at least 8')
]



router.post('/signup',signupValidators,authController.signup);

router.post('/signin',authController.signin)

router.get('/signout',authController.signout)

module.exports=router