import Users from "../../models/Users.js"
import Order from "C:/Users/wastech/Downloads/api-boiler-plate-master/Ecommerce-backend/models/order.js"
import { HashPassword, ComparePassword } from "../../utils/authHelpers"
import  Jwt from "jsonwebtoken"



export const SignupController= async()=>{
    try {
      const {name,email,password,mobilenumber} = req.body
  
      if(!name){
          return res.send({message:'Name is required'})
      }
      if(!email){
          return res.send({message:'Email is required'})
      }
      if(!password){
          return res.send({message:'Password is required'})
      }
      if(!mobilenumber){
          return res.send({message:'Mobile number is required'})
      }
  
      //checkuser
      const ExistingUser = await Users.findOne({email})
  
      //existing user
      if(ExistingUser){
          return res.status(200).send({
              success:false,
              message:'Already registered. Please Login'
  
          })}
  
      //register user
      const HashedPassword = await HashPassword(password)
  
      //save
      const user = new Users({name,email,password:HashedPassword,mobilenumber})
      await user.save()
       return res.status(201).send({
          success : true,
          message : "User Signed Up successfully",
          user
       })
  
    } 
    
    catch (error) {
      console.log(error)
      res.status(500).send({
          success:false,
          message:'Error in Signup',
          error
  
      })
    }
  
  }

export const SigninController= async (req,res) =>{


    try {
        const{email,password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Incorrect email or password"
            });
        }

        const user = await Users.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email not registered"
            
            })
        }

        const match = await ComparePassword(password,user.password)

        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = Jwt.sign({_id:user._id},process.env.JWT_SCRET, {expiresIn:"1d"});

        return res.status(200).send({
            success:true,
            message:"Signed In successfully",
            user:{
                name:user.name,
                email:user.email,
                id:user._id,
                role:user.role
            },
            token
        })
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Signin",
            error
        })
    }

}

export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };


export const forgotPasswordController = async (req,res)=>{

    try {
        const{email} = req.body;
        if(!email ){
            return res.status(200).send({
                success:false,
                message:"Email is required"
            });
        }

        const user = await Users.findOne({email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:"Email not registered"
            
            })
        }

        return res.status(200).send({
            success:true,
            message:"Password reset",
        })
    } 
    
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }

}

export const newPasswordController = async (req,res)=>{

    try {
        const{email,newpassword,confirmpassword} = req.body;
        if(!newpassword ){
            return res.status(404).send({
                success:false,
                message:"Password is required"
            });
        }

        if(!confirmpassword ){
            return res.status(404).send({
                success:false,
                message:"Confirm Password is required"
            });
        }

        if (newpassword !== confirmpassword) {
            return res.status(400).send({
                success: false,
                message: "Password and Confirm Password do not match"
            });
        }

        const user = await Users.findOne({email});

        
        const hashed = await HashPassword(newpassword);
            await Users.findOneAndUpdate({ email: user.email }, 
            { password: hashed })
            return res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
            });
        
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }

}


export const saveOrdersController = async (req, res) => {
    try {
      const itemList = req.body.itemList; 
      const buyerId = req.body.userId; 
      

      const savedOrder = new Order({
        products: itemList,
        buyer: buyerId 
      });
      await savedOrder.save()
      
      res.status(201).json({
        success: true,
        message: "Order saved successfully",
        savedOrder
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error while saving order",
        error: error.message
      });
    }
  };

  export const getOrdersController = async (req, res) => {
    try {
      const userId  = req.params.id; 
      
      const orders = await Order
        .find({ buyer: userId }) 
        .populate("buyer", "name");
        
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting orders",
        error,
      });
    }
  };


  export const getOrdersDetailController = async (req, res) => {
    try {
      const orderId  = req.params.id; 
      
      const orders = await Order.findOne({ _id: orderId }).populate("buyer", "name");
        
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting orders",
        error,
      });
    }
  };

  export const getallOrdersController = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("buyer", "name").sort({ createdAt: "-1" });
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error WHile Geting Orders",
          error,
        });
      }
    };
  


