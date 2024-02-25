import express from 'express';
import {SignupController, SigninController, forgotPasswordController, newPasswordController, testController,saveOrdersController,getOrdersController,getOrdersDetailController,getallOrdersController} from '../controllers/auth/index'
import { requireSignIn, isAdmin} from '../middlewares/authMidleware';

const router = express.Router();

router.post('/signup',SignupController)

router.post('/signin', SigninController)

router.post('/Forgotpassword', forgotPasswordController)

router.post('/Newpassword', newPasswordController)

router.get('/test',requireSignIn, isAdmin, testController)

router.post('/newOrder',saveOrdersController)

router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

router.get("/order/:id",getOrdersController)

router.get("/orderDetail/:id",getOrdersDetailController)

router.get("/allOrders",getallOrdersController)

export default router;

