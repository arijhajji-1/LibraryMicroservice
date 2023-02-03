const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/customers", () => {
    console.log("connected to db");
})
require("./Customer")
const Customer = mongoose.model("Customer")
app.post("/PostCustomer",(req,res)=>
{
    var newCustomer = {
        name: req.body.name,
        address: req.body.address,
        age: req.body.age
    }
    var customer = new Customer(newCustomer)
    customer.save().then(()=>
    {
        console.log("new customer created");
    }).catch((err)=>
    {
        if(err)
        {
            throw err;
        }
    })
    res.send("new customer created with sucess");
})
app.get("/Get",(req,res)=>
{
    Customer.find().then((customers)=>
    {
        res.json(customers)
    }).catch((err)=>
    {
        if(err)
        {
            throw err; 
        }
    })
})
app.get("/Get/:id",(req,res)=>
{
    Customer.findById(req.params.id).then((customer)=>
    {
        if(customer)
        {

            res.json(customer)
        }else{
            res.sendStatus(404)
        }
    }).catch((err)=>
    {
        if(err)
        {
            throw err;
        }
    })
})
app.delete("/DeleteCustomer/:id",(req,res)=>
{
    Customer.findOneAndRemove(req.params.id).then(()=>
    {
        res.send("customer deleted with sucess");

    }).catch((err)=>
    {
        if(err)
        {
            throw err;
        }
    })

})

app.listen("5555",()=> 
{
    console.log("server is running customer");
})