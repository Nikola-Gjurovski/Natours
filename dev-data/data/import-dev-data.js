const fs=require('fs');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const Tour=require('./../../tourModel');
const User=require('./../../userModel');
const Review=require('./../../reviewModel');

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con=>{
   // console.log(con.connections);
   // console.log("DB conection success");
})
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync('./dev-data/data/users.json', 'utf-8'));
const reviews = JSON.parse(fs.readFileSync('./dev-data/data/reviews.json', 'utf-8'));

const importData=async()=>{
    try{
        await Tour.create(tours)
        await User.create(users,{validateBeforeSave:false});
        await Review.create(reviews)
        console.log("Data succesfully loaded!")
        process.exit();
    }
    catch(err){
        console.log(err)
    }
}
const deleteData=async()=>{
    try{
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log('Data succesfully delete')
        process.exit();
    }
    catch(err){
        console.log(err);
    }
}
if(process.argv[2]==='--import'){
    importData();
}
else if (process.argv[2]==='--delete'){
    deleteData();
}
console.log(process.argv);