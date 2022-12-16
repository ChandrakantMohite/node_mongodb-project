var express=require("express");
var mongodb=require("mongodb");

var app=express();
var MongoClient=mongodb.MongoClient;
var url="mongodb://localhost:27017";
app.use(express.json());
 
app.get("/",(req,res)=>{
    res.end("hello");
})

app.put("/save",(req,res)=>{
    let body=req.body;
    MongoClient.connect(url,(err,db)=>{
     var dbo=db.db("mongodbsample");
     dbo.collection("users").insertOne({name:body.name,email:body.email},(err,result)=>{
        if(err){
          res.end(JSON.stringify({status:"failed",data:err}))
        }
        else{
            res.end(JSON.stringify({status:"success",data:result}))
          }
     })
    });

})
app.get("/list",(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        var dbo=db.db("mongodbsample");
        dbo.collection("users").find({}).toArray((err,result)=>{
           if(err){
             res.end(JSON.stringify({status:"failed",data:err}))
           }
           else{
               res.end(JSON.stringify({status:"success",data:result}))
             }
        })
       });
})

app.get("/list/:name",(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        var dbo=db.db("mongodbsample");
        dbo.collection("users").findOne({name:req.params.name},(err,result)=>{
            if(err){
                res.end(JSON.stringify({status:"failed",data:err}))
              }
              else{
                  res.end(JSON.stringify({status:"success",data:result}))
                }
        })
    })
})

app.post("/update/:name",(req,res)=>{
    let body=req.body;
    MongoClient.connect(url,(err,db)=>{
        var dbo=db.db("mongodbsample");
        dbo.collection("users").updateOne({name:req.params.name},{$set:{name:body.name,email:body.email}},(err,result)=>{
            if(err){
                res.end(JSON.stringify({status:"failed",data:err}))
            }
            else{
                res.end(JSON.stringify({status:"success",data:result}))
              }
            
        })
    })
})
app.delete("/delete/:name",(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        var dbo=db.db("mongodbsample");
        dbo.collection("users").deleteOne({name:req.params.name},(err,result)=>{
            if(err){
                res.end(JSON.stringify({status:"failed",data:err}))
            }
            else{
                res.end(JSON.stringify({status:"success",data:result}))
              }
            
        })
    })
})

app.listen(8081,()=>{
    console.log("server is running on http://localhost:8081/")
})