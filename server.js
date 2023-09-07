const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
process.on("uncaughtException",err=>{
    console.log(err.name,err.message);
    console.log("Unhandle Rejection");
    process.exit(1);
})
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con=>{
   // console.log(con.connections);
   // console.log("DB conection success");
})
const app=require('./app.js');
const port=process.env.PORT|| 3000;
const server=app.listen(port,()=>{
    console.log("App running on port "+port);
})
process.on('unhandledRejection',err=>{
    console.log(err.name,err.message);
    console.log("Unhandle Rejection");
    server.close(()=>{
    process.exit(1);})
})

//console.log(a)