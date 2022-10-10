 import express from 'express';
 import cors from 'cors';
 import mongoose from 'mongoose';
 import Pusher from 'pusher';
 

 //app config
const app=express()
const port=process.env.PORT || 9000


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
    console.log('DB connected bro enjoy the app')
})

 //api routes
app.get('/',(req,res)=>res.status(200).send('hello world'))
app.post('/upload',(req,res)=>{
    const body=req.body
    res.status(201).send(body)
})

 //listen

app.listen(port,()=>console.log(`listening on localhost:${port}`))

