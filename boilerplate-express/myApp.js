const bodyParser = require('body-parser');
let express = require('express');
let app = express();
require('dotenv').config();

const filePath=__dirname + '/public';
console.log(filePath);

app.use(bodyParser.urlencoded({extends:false}));

app.use((req,res,next)=>{
   console.log(`${req.method} ${req.path} - ${req.ip}`);
   next();
});

app.use('/public',express.static(filePath));

app.get("/",(req,res)=>{
    const absolutePath=__dirname + '/views/index.html';
    // console.log(absolutePath);
    res.sendFile(absolutePath);
})

app.get("/json",(req,res)=>{
    let message="Hello json";
    if(process.env.MESSAGE_STYLE==="uppercase"){
         message=message.toUpperCase();
    }
    res.json({
        message
    })
})

app.get('/now',function(req,res,next){
    req.time=new Date().toString();
    next();
},
function(req,res){
    res.json({
        time:req.time
    })
})

app.get("/:word/echo",(req,res)=>{
    const word=req.params.word;
    res.json({
        echo:word
    })
})

app.route('/name').get((req,res)=>{
    const{first,last}=req.query;
    res.json({
        name:`${first} ${last}`
    })
})
.post((req,res)=>{
    const {first, last}=req.body;
    res.json({name:`${first} ${last}`})
})




























 module.exports = app;
