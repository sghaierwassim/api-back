const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes/contactRoute');


const app = express();



const mongodbUrl = 'mongodb://localhost:27017/contact';

mongoose.connect(mongodbUrl,{ useNewUrlParser: true,useFindAndModify: false  },(err)=>{
    if (err) {
        console.log('Error  connecting to database !!')
    } else {
        console.log('Connected to database with success')
    }
});




app.use('/',routes);



app.listen(3030, (err) => {
    if(err) console.log('an error appeared while connecting to server !!')
    else console.log('Server run on port 3030 !!')
})

