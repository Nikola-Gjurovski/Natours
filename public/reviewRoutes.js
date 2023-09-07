const express=require('express');
const fs=require('fs');
const rewievController=require('./../controllers/reviewController');
const authController=require('../controllers/authController.js');
const reviewRouter=express.Router({mergeParams:true});
reviewRouter.use(authController.protect);
reviewRouter.get('/',rewievController.getAllReviews);
reviewRouter.post('/',authController.restrictTo('user'),rewievController.setTourUsersIds, rewievController.createReview);
reviewRouter.route('/:id').delete(rewievController.deleteReview).patch(authController.restrictTo('user','admin'),rewievController.updateReview)
.delete(authController.restrictTo('user','admin'),rewievController.deleteReview);
module.exports=reviewRouter;
