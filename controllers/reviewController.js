const Review=require('./../reviewModel.js');
const express=require('express');
const fs=require('fs');
const APIFeatures=require('./utils/apiFeautures');
const AppError = require('./../appError.js');
const factory=require('./handleFactory');
const catchAsync=fn=>{
  return (req,res,next)=>{
    fn(req,res,next).catch(next);
  }
}
exports.getAllReviews=factory.getAll(Review);
exports.setTourUsersIds=(req,res,next)=>{
    if(!req.body.tour) req.body.tour=req.params.tourId
    if(!req.body.user) req.body.user=req.user.id
    next();
}
exports.createReview=factory.createOne(Review)
exports.deleteReview=factory.deleteOne(Review);
exports.updateReview=factory.updateOne(Review);
exports.getReview=factory.getOne(Review);