require('dotenv').config()
const  express=require('express')
const  mongoose=require('mongoose')
const authRoutes=require('./routes/auth')
const bodyparser=require('body-parser')
const cookieparser=require('cookie-parser')
const morgan=require('morgan')
const cors=require('cors')
const eventRoutes=require('./routes/event')
const path = require('path');
const multer=require('multer')
const createHash=require('hash-generator')

const app=express()

var fileFilter=(req,file,cb)=>
{
     if(file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg')
     {
          cb(null,true);
     }
     else
     {
         cb(null,false);
     }
}
var fileStorage=multer.diskStorage(
  {
      destination:(req,file,cb)=>
      {
          
          cb(null,'images');
      },
      filename:(req,file,cb)=>
      {
          const hash=createHash(8)
           cb(null,hash+file.originalname)
      }
  }
)


app.use(cors())

app.use(bodyparser.json())
app.use(cookieparser())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage,fileFilter:fileFilter}).single('image'))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/api',authRoutes)

app.use('/api',eventRoutes)

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hen5b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(()=>
{
     app.listen(process.env.PORT||8000,()=>
     {
     })
})

