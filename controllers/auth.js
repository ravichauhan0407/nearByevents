const User =require('../modals/user.js')
const {errorHandler}=require('../helpers/dbErrorHandler.js')
const { validationResult } = require('express-validator')
const mongoose=require('mongoose')

const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt')

exports.signup=(req,res,next)=>
{
     const errors=validationResult(req)
     if(!errors.isEmpty())
     {
           return res.status(200).json({status:false,errors:errors.array()})
     }


    const user=new User(req.body)
    user.save()
    .then((user)=>
    {
         user.salt=undefined;
         res.send(user)
    })
    .catch((err)=>{
        
       res.status(200).json({status:false})
    })
     
}

exports.signin=(req,res,next)=>
{
     

    try
    {
      const  {email,password}=req.body
     User.findOne({email},(err,user)=>
     {
          if(err||(!user))
          {
                 return res.status(200).json({error:'email does not found.Please signup',status:false})
          }
          if(!user.authenticate(password))
          {
                 return res.status(200).json({error:'Email and password does not match',status:false})
          }
        
           const token =jwt.sign({_id:user._id},process.env.JWT_SECRET)
           res.cookie('t',token,{expire:new Date()+9999});
           const {_id,name,email,role}=user
           res.json({token,user:{_id,name,email},status:true})
     })
}
catch(error)
{
        res.status(200).json({status:false})
}
  
}


exports.signout=(req,res,next)=>
{
      res.clearCookie('t')
      res.json({message:'Signout success'})
}


exports.requireSignin=expressJwt({
            secret:process.env.JWT_SECRET,
            userProperty:'auth',
            algorithms: ['HS256']
})

exports.isAuth=(req,res,next)=>
{

      let user=req.profile&&req.auth&&(req.profile._id.valueOf()===req.auth._id)
      if(!user)
      {
            res.status(200).json({error:'Access denied',status:false})
      }
      next()
}
