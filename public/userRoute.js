// const express=require('express');
// const userRoute=express.Router();
// const authController=require('./../controllers/authController.js');
// const reviewController=require('./../controllers/reviewController.js')
// const{getAllUsers, getUser,CreateUser,UpdateUser,DeleteUser,updateMe,deleteMe,getMe}=require('./../controllers/userController.js')
// userRoute.post('/signup',authController.singup)
// userRoute.post('/login',authController.login);
// userRoute.post('/forgotPassword',authController.forgotPassword);
// userRoute.patch('/resetPassword/:token',authController.resetPassword);


// // userRoute.use(authController.protect);
// userRoute.patch('/updateMypassword',authController.protect,authController.updatePassword);
// userRoute.patch('/updateMe',authController.protect,updateMe);
// userRoute.delete('/deleteMe',authController.protect,deleteMe);
// userRoute.route('/').get(authController.restrictTo('admin'),getAllUsers);
// userRoute.route('/:id').get(getUser).patch(UpdateUser).delete(DeleteUser);
// userRoute.get('/me',authController.protect,getMe,getUser);

// //userRoute.route('/login').post(authController.login);
// //userRoute.use(authController.restrictTo('admin'));

// //////

// //userRoute.route('/:tourId/reviews').post(authController.protect,authController.restrictTo('users'),reviewController.createReview)
// module.exports=userRoute;
const express = require('express');
const multer=require('multer');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
//const upload=multer({dest:'public/img/users'});
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);


// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe,userController.getUser);
router.patch('/updateMe',userController.uploadUserPhoto,
userController.resizeUserPhoto,userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
 

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
