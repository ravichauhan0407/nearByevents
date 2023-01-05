const User =require('../modals/user.js')

exports.userById=(req,res,next,id)=>
{
        User.findById(id,(err,user)=>
        {
              if(err||(!user))
               {
                  return res.status(200).json({status:false,error:'user not found'});
               }
              req.profile=user;
              next();
        })
}
