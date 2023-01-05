const mongoose =require('mongoose')

const  crypto=require('crypto')

const uuidv1=require('uuid').v1


const userSchema=mongoose.Schema({
     name:
     {
         type:String,
         trim:true,
         required:true,
         maxlength:32
     },
     email:
     {
         type:String,
         trim:true,
         required:true,
         unique:32
     },
     hashed_password:
     {
        type:String,
        required:true,
     },
     salt:String,
},{timestamps:true})

userSchema.methods={
    
    authenticate:function(plainText)
    {
         return this.hashed_password===this.encryptPassword(plainText)
    },
    encryptPassword:function(password){
        if(!password)return "";

        try{
            return crypto.createHmac('sha1',this.salt)
                    .update(password)
                    .digest('hex')
        }
        catch(err)
        {
            console.log(err)
        }
    }
}




userSchema.virtual('password')
.set(function(password)
{
    this._password=password;
    this.salt=uuidv1()
    //hasing password with salt and hashing sha1 
    this.hashed_password=this.encryptPassword(password)
})
.get(()=>{
    
    return this._password
})



module.exports=mongoose.model("User",userSchema)

