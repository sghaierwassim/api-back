const bodyParser = require('body-parser');
const router = require('express').Router();
const ContactModel = require('../Models/contactModel');





router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
  next();
}).use(
    bodyParser.urlencoded({ extended: false })
).use(
    bodyParser.json()
).get('/contacts',(req,res) => {
    ContactModel.find({},(err,contacts)=>{
        if (err) {
            return err;
        } else {
            res.send(contacts);
        }
    });    
}).get('/contacts/:id',(req,res) => {
    ContactModel.find({_id : req.params.id},(err,contact)=>{
        if (err) {
            res.send({Error : "Error is occured with query contacts"});
        } else {
            res.send(contact);
        }
    });    
}).put('/contact',(req,res) => {
    let newContact = {
        name : req.body.name,
        age : req.body.age,
        email : req.body.email,
        phone : req.body.phone
    };
    ContactModel.findByIdAndUpdate(req.body._id,{$set : newContact},(err)=>{
        if(err) res.send({error : "Error with update contact !!"+err});
        else res.send({error : null});
    })

}).post('/contact',(req,res) => {
    newContact = new ContactModel({
        name : req.body.name,
        age : req.body.age,
        email : req.body.email,
        phone : req.body.phone
    });

    

    newContact.save((err,contact)=>{
        if(err) res.send({error : "Error with saving contact !!"});
        else {
            res.send(contact);
        }
    })

}).delete('/contact/:id',(req,res) => {

    ContactModel.findByIdAndDelete(req.params.id,(err)=>{
        if(err) res.send({error : "Error with deleting contact !!"});
        else res.send({error : null});
    })

});


module.exports = router;