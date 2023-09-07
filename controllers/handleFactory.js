const APIFeatures=require('./utils/apiFeautures');
const AppError = require('./../appError.js');
const catchAsync=fn=>{
  return (req,res,next)=>{
    fn(req,res,next).catch(next);
  }
}
exports.deleteOne=Model=>catchAsync(async(req,res,next)=>{
 
   const doc= await Model.findByIdAndDelete(req.params.id);
   if(!doc){
    return next(new AppError('No document found with that ID',404));
   }
    res.status(204).json({
      status:'success',
      data: null
      
    })
   
  
  
  })
  exports.updateOne=Model=>catchAsync(async(req,res,next)=>{
 
    const tour=await Model.findByIdAndUpdate(req.params.id,req.body,{
       new:true,
       runValidators:true//dozvoluva validatoite da vazhat za ovaa tura
     })
     if(!tour){
      return next(new AppError('No document found with that ID',404));
     }

     res.status(200).json({
       status:'success',
       data:{
         data:tour
       }
     })
   }
   )
   exports.createOne=Model=> catchAsync(async (req, res,next) => {
    const newTour = await Model.create(req.body);
    console.log(newTour); // Log the newly created tour
    res.status(201).json({
      status: 'success',
      data: {
        data: newTour,
      },
    });  
  })
  exports.getOne=(Model,populateOptions)=>catchAsync(async (req, res, next) => {
    let tour;
    if(populateOptions){
     tour = await Model.findById(req.params.id).populate(populateOptions);
    }
    else{
     tour = await Model.findById(req.params.id);
    }
    
    if (!tour) {
      console.log("here");
      return next(new AppError(`No tour found with that ID`, 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        data:tour
      }
    });
  });
  exports.getAll=Model=> catchAsync(async (req,res,next)=>{
 
    console.log(req.query)
    let filter={};
    if(req.params.tourId) filter={tour:req.params.tourId};
  const feautures=new APIFeatures(Model.find(filter),req.query).filter().sort().limitFields().pagining();
  // const tours=await feautures.query.explain();
  const tours=await feautures.query;
    res.status(200).json({
      status:"success",
      resuts:tours.length,
      data:{
        data:tours
      }
    })
  

})