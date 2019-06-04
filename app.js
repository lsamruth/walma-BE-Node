const express = require('express');
const app = express();
const route = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(route);

let server = app.listen(5000, ()=>{
    console.log('server is running');
})