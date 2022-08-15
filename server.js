const express = require('express');
const dotenv = require('dotenv'); //config.env
const mongoose = require("mongoose");


const bodyparser = require("body-parser"); //middleware for requests
const path = require('path'); //finds file path


const connectDB = async () => {
    try{
        const con = await mongoose.connect('mongodb://localhost:27017/testdatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
        }catch(err){
        console.log(err);
        console.log("Couldn't connect to database")
        }
}



const app = express();

dotenv.config( { path : 'config.env'} );
const PORT = process.env.PORT;


connectDB();

app.use(bodyparser.urlencoded({ extended : true}))
//view engine!!! 
app.set("view engine", "ejs")


app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/', require('./server/routes/router'))



app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


app.use('/', require('./server/routes/router'))

try {
    app.listen(PORT);
    console.log("Running on port "+PORT);
  }
  catch(err) {
    console.log(err);
  }