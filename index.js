const express=require("express");
const mongoose=require("mongoose")
const cors=require("cors")
require('dotenv').config()
const bodyParser = require("body-parser");
const port=parseInt(process.env.PORT)
const url=process.env.MONGO_URL 

const app=express()
app.use(cors(
 {
    'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',

  }));
  
  
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(url, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   
    dbName: "POP",
    
  
});

const con=mongoose.connection

const infoRouter=require("./router")
app.use("/api",infoRouter);

const router=express.Router()
router.get("/",async(req,res)=>{
    try{
        console.log("hit")
        res.status(200).send("Connected")
    }
    catch(err){
        console.log(err)
        res.status(500).send("err")
    }
})
con.on("open",(err)=>{
    if (err) console.log(err)
    else console.log("db connected")
})

app.listen(10000,function(err){
    if(err) console.log(err)
    else console.log("server running at ",10000)
})