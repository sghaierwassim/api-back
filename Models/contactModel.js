const mongoose = require('mongoose');


let contactSchema = mongoose.Schema({
    name : String,
    age : Number,
    email : {type : String , required : true},
    phone : Number
})

let contactModel = mongoose.model('Contact',contactSchema);

module.exports =  contactModel ;  
