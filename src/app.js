const express=require("express");
const app=express();
const dotenv=require("dotenv")
const path = require("path")
const session = require('express-session');

dotenv.config({path:'./config.env'})

const PORT=process.env.PORT;

require('./db/conn');

app.use(express.json());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,  resave: false,saveUninitialized: true}));
app.use(express.urlencoded({extended:false}));

app.use(require('./routes/auth'));

const staticPath=path.join(__dirname,"./reglog")
app.use(express.static(staticPath));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/reglog/register.html'));
  });

app.listen(PORT)