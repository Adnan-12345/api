const express=require('express');
const dbConn = require('./config/db.con');
const app=express();
const logger = require('./middleware/logger');
const postRoutes = require('./routes/posts');
const authorRoutes = require('./routes/author');
const cors = require('cors');
const port=process.env.port || 3000;
let postsData=[];
const corsOption={
    "origin":"*"
}
app.use(cors(corsOption));
app.use(logger);
app.use(express.json());
app.use('/api/post',postRoutes);
app.use('/api/author',authorRoutes);
dbConn();


app.listen(port,()=>{
    console.log(`The server is started at port ${port}`);
})