 import express from 'express';
 import cors from 'cors';
 import mongoose from 'mongoose';
 import Pusher from 'pusher';
 import dbModel from './dbModel.js';
 

 //app config
const app=express()
const port=process.env.PORT || 9000

const pusher = new Pusher({
  appId: "1490883",
  key: "fbfaa8a8a102ee48de0a",
  secret: "b5fda15eda8295e46b1e",
  cluster: "ap2",
  useTLS: true
});

 //middleware
app.use(express.json())
app.use(cors())


 //db config
const connection_url='mongodb+srv://binoy:1Elr5dZhrdNzyvsv@cluster0.kw5invo.mongodb.net/instagram?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    })

mongoose.connection.once('open',()=>{
    console.log('DB connected bro enjoyy the app')

    const changeStream=mongoose.connection.collection('posts').watch()
    changeStream.on('change',(change)=>{
        console.log(change)
        if(change.operationType==='insert'){
            console.log('triggering pusher')
            const postDetails=change.fullDocument
            pusher.trigger('posts','inserted',{
                user:postDetails.user,
                caption:postDetails.caption,
                image:postDetails.image
            })
        }else{
            console.log('error triggering pusher try again')
        }
    })

})

 //api routes
app.get('/',(req,res)=>res.status(200).send('hello world'))
app.post('/upload',(req,res)=>{
   const body=req.body
dbModel.create(body,(err,data)=>{
    if(err){
        res.status(500).send(err)
    }else{
        res.status(201).send(data)
    }
})
})

app.get('/sync',(req,res)=>{
    dbModel.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

 //listen
app.listen(port,()=>console.log(`listening on localhost:${port}`))

