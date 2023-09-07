const Tour=require('../tourModel')
const User=require('../userModel')
const AppError=require('./../appError')
const catchAsync=fn=>{
    return (req,res,next)=>{
      fn(req,res,next).catch(next);
    }
  }
exports.getOverview=catchAsync(async(req,res,next)=>{
    const tours=await Tour.find();
    res.status(200).render('overview',{
        title:'All Tours',
        tours
    });
});
exports.getTour=catchAsync(async(req,res,next)=>{
    const tour=await Tour.findOne({slug:req.params.slug}).populate({
        path:'reviews',
        fields:'review rating user'
    })
    if(!tour){
        return next(new AppError('There is no tour with that name',404))
    }
    res.status(200).render('tour',{
        title:`${tour.name} Tour`,
        tour
    })
})
exports.getLoginForm=catchAsync(async(req,res)=>{
    res.status(200).render('login',{
        title:'Log into your account'
    })
})
exports.getSignForm=catchAsync(async(req,res)=>{
    res.status(200).render('signup',{
        title:'Create your account'
    })
})
exports.getAccount=(req,res)=>{
    res.status(200).render('account',{
        title:'Welcome to your account'
    })
}
exports.updateUserData=catchAsync(async(req,res,next)=>{
const updatedUser=await User.findByIdAndUpdate(req,user,id,{
    name:req.body.name,
    email:req.body.email
},{
    new:true,
    runValidators:true
});
res.status(200).render('account',{
    title:'Welcome to your accout',
    user:updatedUser
})
});