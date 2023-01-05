
const Event=require('../modals/event')
const {errorHandler} =require('../helpers/dbErrorHandler')

exports.addEvent=(req,res,next)=>
{
    const data={
        title:req.body.title,
        imgUrl:'/'+req.file.path,
        description :req.body.description,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        college:req.body.college,
        city:req.body.city
    }
    
    const event=new Event(data)
    event.save()
    .then((event)=>
    {
         res.status(200).json({status:true})
    })
    .catch((err)=>{
       res.status(200).json({status:false})
    })
}


exports.getUpcommingEvent=(req,res,next)=>
{ 
  
     let x=new Date();
     let y=Math.floor(x.getTime()/1000).toString()
     //console.log(y.toString())
     let queryObject={startTime:{$gt:y}}
    
     Event.find(queryObject)
     .then((events)=>
     {
           res.status(200).json({status:true,items:events})
     })
     .catch((err)=>
     {
        res.status(200).json({status:false})
     })
}


exports.getPastEvent=(req,res,next)=>
{ 
     
     let x=new Date();
     let y=Math.floor(x.getTime()/1000).toString()
     let queryObject={endTime:{$lt:y}}
     Event.find(queryObject).sort({'endTime': -1})
     .then((events)=>
     {
           res.status(200).json({status:true,items:events})
     })
     .catch((err)=>
     {
        res.status(200).json({status:false})
     })
}


exports.getLiveEvent=(req,res,next)=>
{ 
     let x=new Date();
     const resultsPerPage = 8;
     let page = req.params.page >= 1 ? req.params.page : 1;

     let y=Math.floor(x.getTime()/1000).toString()
     let queryObject={startTime:{$lt:y},endTime:{$gt:y}}
    
     console.log(queryObject)
     Event.find(queryObject).sort({'endTime': -1})
   //   .limit(resultsPerPage)
   //   .skip(resultsPerPage * page)
     .then((events)=>
     {
           res.status(200).json({status:true,items:events})
     })
     .catch((err)=>
     {
        res.status(200).json({status:false})
     })
}

exports.getEvent=(req,res,next)=>
{
        let id=req.params.id;
        console.log(id)
        Event.findById(id).then((event)=>
        {
             res.status(200).json({event:event,status:true})
        })
        .catch((err)=>
        {
           res.status(200).json({status:false})

        })


}

