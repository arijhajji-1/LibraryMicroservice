//load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//load mongoose
const mongoose = require("mongoose");
require("./book")
const Book = mongoose.model("Book")
//connect
mongoose.connect("mongodb://localhost:27017/books" ,() => {
  console.log("connected to db");
})
app.get('/',(req,res)=>{
    res.send("test");
})
//create 
app.post('/create',(req,res)=>{
  var newbook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
  }

  var book = new Book(newbook)
     book.save().then(()=> {
            console.log("new book created")
     }).catch((err)=>
     {
            if(err){
                throw err;
            }
     })
     res.send("a new book created with sucess")
})
//read
app.get('/read',(req,res)=>{


    Book.find().then((books)=>{
        res.json(books)
    }).catch(err=>{
        if(err){
            throw err;  
        }
    })
  
})
//get by id
app.get('/read/:id',(req,res)=>{
    //res.send(req.params.id)
    Book.findById(req.params.id).then((book)=>
    {
        if(book){
            res.json(book)
        }else{
            res.sendStatus(404)
        }
    }).catch(err=>{
        if(err){
            throw err;
        }
    }
    )
})
//delete
app.delete('/delete/:id',(req,res)=>{

    Book.findOneAndRemove(req.params.id).then(()=>{
        res.send("book removed with sucess")
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})

app.listen(4545,()=>{
    console.log("server is running on port 4545");
})