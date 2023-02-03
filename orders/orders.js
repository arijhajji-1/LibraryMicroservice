const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const axios = require ("axios");

mongoose.connect("mongodb://localhost:27017/orders", () => {
    console.log("connected to db");
})
require("./Order")


const Order = mongoose.model("Order")
app.post("/orderPost",(req,res)=>{
    var newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        date: req.body.date,
        deliveryDate: req.body.deliveryDate
    }
    var order = new Order(newOrder)
    order.save().then(()=>{
        console.log("new order created")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
    res.send("new order created with sucess")
})
app.get("/orderGet",(req,res)=>{
    Order.find().then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
}
)

app.get("/orderGet/:id",(req,res)=>{

    Order.findById(req.params.id).then((order)=>{
        if(order){
           
axios.get("http://localhost:5555/Get/"+ order.CustomerID).then((response)=>
{
    console.log(response)
    var orderObject = { customerName: response.data.name, bookTitle: ''}
    axios.get("http://localhost:4545/read/"+ order.BookID).then((response)=>
    {
        orderObject.bookTitle=response.data.title
        res.json(orderObject)
    })
})
        }else{
            res.send("error")
        }
    })
}
)
app.delete("/orderDelete/:id",(req,res)=>{
    Order.findOneAndRemove(req.params.id).then(()=>{
        res.send("order deleted with sucess")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
}
)



app.listen(7777, () => {

    console.log("up and running orders");
})