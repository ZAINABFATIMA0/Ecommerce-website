import  Jwt from "jsonwebtoken"
import Users from "../models/Users";

export const requireSignIn = async (req, res, next) => {
    try {
      const decode = Jwt.verify(
        req.headers.authorization,
        process.env.JWT_SCRET
      );
      req.user = decode;
      next();
    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Unauthorized Access",
          });
    }
  };


export const isAdmin = async (req, res, next) => {
    try {
      const user = await Users.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } 
        next();
      
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };

