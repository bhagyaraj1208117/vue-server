const router=require("express").Router()
const infoModel=require("./infoSchema") 

router.get("/",(req,res)=>{
    try{

        infoModel.find().sort().then(result => {
            res.status(200).send(result)
          }).catch(error => {
            console.log(error)
            res.status(400).send("Database Error")
          })
    }
    catch(err){
        res.send(500).send("Server Err")
    }
})

router.put("/edit",async(req,res)=>{
    try{
        const userId=req.body._id
        console.log("userID",userId)
        infoModel.findByIdAndUpdate(userId, { name: req.body.name },{email:req.body.email}).then((data)=>{
          console.log(data)
        res.status(204).send(data)}).catch((err)=>res.status(400).send("DB:Err"))
    }
    catch(err){
      console.log(err)
        res.status(500).send("Server Err")
    }
})
router.post("/save",async(req,res)=>{
    try{
        
      console.log("hit ",req.body)
       
        const newData=infoModel({
            
            name:req.body.name,
            email:req.body.email,
           
        })
        console.log("newData",newData)
       newData.save().then(()=>{
        
        console.log("success")
        res.status(200).send("Successfully Added")}).catch((err)=>res.status(400).send(err))        
    }
    catch(err){
      console.log(err)

        res.status(500).send("Server Err")
    }
})

router.delete("/delete/:id",async(req,res)=>{
  try{
    const id=req.params.id 
    console.log(id)
    infoModel.deleteOne({ _id:id }).then((data)=>res.status(204).send("Delete successfully")).catch((err)=>{
      
      console.log(err)
      res.status(400).send("DB:Err")

    })
  }
  catch(err){
    console.log(err)
    res.status(500).send("Server:Err")
  }
})
module.exports=router;