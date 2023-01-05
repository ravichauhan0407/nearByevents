const mongoose=require('mongoose')


const eventSchema=mongoose.Schema({
    title:
    {
        type:String,
        required:true
    },
    imgUrl:
    {
          type:String,
          required:true
    },
    description:
    {
        type:String,
        required:true
    },
    startTime:
    {
        type:String,
        required:true
    },
    endTime:
    {
        type:String,
        required:true
    },
    college:
    {
        type:String,
        required:true
    },
    city:
    {
         type:String,
         required:true
    },

})

module.exports=mongoose.model("Events",eventSchema)