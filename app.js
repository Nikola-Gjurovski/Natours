const express=require('express');
const app=express();
const rateLimit=require('express-rate-limit');//npm i express-rate-limit
const helmet=require('helmet');//npm i helmet
const mongoSanitize=require('express-mongo-sanitize');//npm i express-mongo-sanitize
const xss=require('xss-clean');//npm i xss-clean
const hpp=require('hpp');
const morgan=require("morgan");
const path=require('path');
const cookieParser=require('cookie-parser')//npm i cookie-parser
const tourRute=require('./public/tourRoutes.js');
const userRoute=require('./public/userRoute.js');
const reviewRouter=require('./public/reviewRoutes.js')
const viewRouter=require('./public/viewRoutes.js')
const AppError=require('./appError.js');
const GlobalErrorHandler=require('./controllers/errorController.js');
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.use(helmet());
//Middleware za isprobuvanje
app.use((req,res,next)=>{
    console.log("Hello from the midlware");
    next();
})
app.use((req,res,next)=>{
    req.requestTime=new Date();
    next();
})
//Development login
if(process.env.NODE_ENV==='development'){
app.use(morgan('dev'));
}
//Limit
const limiter=rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:"Too many requs from this IP,please try again in an hour"
})
app.use('/api',limiter);
//Bodu parser so req.body limit
app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({extendet:true,limit:'10kb'}))//za updateUser
app.use(cookieParser());
//app.use(express.static(path.join(__dirname,'public')))
//Security
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({
    whitelist:['duration','ratingsQuantity','ratingsAverage','maxGroupSize','difficulty','price']
}));
//Middleware
// app.get('/',(req,res)=>{
//     res.status(200).render('base',{
//         tour:'The Forest Hiker',
//         user:'Jonas'
//     });
// })
// app.get('/overview',(req,res)=>{
//     res.status(200).render('overview',{
//         title:'All Tours'
//     })
// })
// app.get('/tour',(req,res)=>{
//     res.status(200).render('overview',{
//         title:'The Forest Hiker Tour'
//     })
// })

app.use(express.static(path.join(__dirname,'public')))
app.use('/',viewRouter);
app.use('/api/v1/tours',tourRute);
app.use('/api/v1/users',userRoute);
app.use('/api/v1/reviews',reviewRouter);

app.all('*',(req,res,next)=>{
    // res.status(404).json({
    //     status:'fail',
    //     messeage:"Can't find api/tours on this server!"
    // })
    // const err=new Error(`Can't find ${req.originalUrl} on this server!`);
    // err.status='fail';
    // err.statusCode=404;
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
})
app.use(GlobalErrorHandler);
module.exports=app;