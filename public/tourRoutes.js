const express = require('express');
const fs = require('fs');
const tourRute = express.Router();
const authController=require("./../controllers/authController.js")
const reviewController=require('./../controllers/reviewController.js');
const reviewRouter=require('./reviewRoutes.js');
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkError,
  checkBody,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithIn,
  getDistances,
  uploadTourImages,
  resizeTourImages
} = require('./../controllers/tourController.js');

tourRute.param('id', (req, res, next, value) => {
  if (value > tours.length || value < 0) {
    return res.status(404).json({
      status: 'fail',
      messege: 'Invalid id',
    });
  }
  next();
});
tourRute.route('/top-5-cheap').get(aliasTopTours,getAllTours);
tourRute.route('/tour-stats').get(getTourStats);
tourRute.route('/monthly-plan/:year').get(authController.protect,authController.restrictTo('admin','lead-guide','guide'),getMonthlyPlan);
tourRute.route('/tours-within/:distance/center/:latlng/unit/:unit').get(getToursWithIn);
tourRute.route('/distances/:latlng/unit/:unit').get(getDistances);
tourRute.route('/').get(getAllTours).post(authController.protect,authController.restrictTo('admin'),createTour);
tourRute.route('/:id').get(getTour).patch
(authController.protect,authController.restrictTo('admin','lead-guide'),uploadTourImages,resizeTourImages,
updateTour)
.delete(authController.protect,authController.restrictTo('admin','lead-guide') ,deleteTour);

//tourRute.route('/:tourId/reviews').post(authController.protect,authController.restrictTo('user'),reviewController.createReview)
tourRute.use('/:tourId/reviews',reviewRouter);
module.exports = tourRute;
