
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
         res.send(event)
    })
    .catch((err)=>{
       console.log(err)
       res.status(400).send("db error")
    })
}


exports.getUpcommingEvent=(req,res,next)=>
{ 
  
     let x=new Date();
     let y=Math.floor(x.getTime()/1000).toString()
     console.log(y.toString())
     let queryObject;
     if(!req.query.city)
     {
         queryObject={startTime:{$gt:y}}
     }
     else
     {
        queryObject={city:{ $regex: new RegExp("^" + req.query.city.toLowerCase(), "i") } ,startTime:{$gt:y}}
     }
     Event.find(queryObject)
     .then((events)=>
     {
           res.status(200).json(events)
     })
     .catch((err)=>
     {
        res.status(400).send(errorHandler(err))
     })
}


exports.getPastEvent=(req,res,next)=>
{ 
     
     let x=new Date();
     let y=Math.floor(x.getTime()/1000).toString()
     let queryObject;
     if(!req.query.city)
     {
         queryObject={endTime:{$lt:y}}
     }
     else
     {
        queryObject={city:{ $regex: new RegExp("^" + req.query.city.toLowerCase(), "i") },startTime:{$lt:y}}
     }
     Event.find(queryObject).sort({'endTime': -1})
     .then((events)=>
     {
           res.status(200).json(events)
     })
     .catch((err)=>
     {
        res.status(400).send(errorHandler(err))
     })
}


exports.getLiveEvent=(req,res,next)=>
{ 
     let x=new Date();
     const resultsPerPage = 8;
     let page = req.params.page >= 1 ? req.params.page : 1;

     let y=Math.floor(x.getTime()/1000).toString()
     let queryObject;
     if(!req.query.city)
     {
         queryObject={startTime:{$lt:y},endTime:{$gt:y}}
     }
     else
     {
         queryObject={city:{ $regex: new RegExp("^" + req.query.city.toLowerCase(), "i") },startTime:{$lt:y},endTime:{$gt:y}}
     }
     console.log(queryObject)
     Event.find(queryObject).sort({'endTime': -1})
   //   .limit(resultsPerPage)
   //   .skip(resultsPerPage * page)
     .then((events)=>
     {
           console.log(events)
           res.status(200).json(events)
     })
     .catch((err)=>
     {
        res.status(400).send(errorHandler(err))
     })
}


exports.getEvent=(req,res,next)=>
{
        let id=req.params.id;
        console.log(id)
        Event.findById(id).then((event)=>
        {
             res.status(200).json(event)
        })
        .catch((err)=>
        {
           res.status(400).send(errorHandler(err))

        })


}

