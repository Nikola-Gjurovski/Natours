const express=require('express');
const router=express.Router();
const viewsController=require('../controllers/viewsController');
const authController=require('../controllers/authController');
// router.get('/',(req,res)=>{
//     res.status(200).render('base',{
//         tour:'The Forest Hiker',
//         user:'Jonas'
//     });
// })
//router.use(authController.isLoggedIn);
router.get('/',authController.isLoggedIn,viewsController.getOverview)
router.get('/tour/:slug',authController.isLoggedIn,viewsController.getTour)
router.get('/login',authController.isLoggedIn,viewsController.getLoginForm)
router.get('/signup',authController.isLoggedIn,viewsController.getSignForm)
router.get('/me',authController.protect,viewsController.getAccount);
router.post('/submit-user-data',authController.protect,viewsController.updateUserData);
module.exports=router;