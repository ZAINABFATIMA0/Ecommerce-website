import { ProgressPlugin } from "webpack";
import Products from "../models/Product";
import {useParams} from 'react-router-dom';

export const productController= async(req,res) =>{
    try {
        const { photo,Productname,price,color,size,description,stock } =
          req.body;
    
          if (!photo){
            return res.send({ error: "photo is Required" });}
          if (!Productname){            
            return res.send({ error: "Name is Required" });}
          if (!price){
            return res.send({ error: "Price is Required" });}
          if (!color){
            return res.send({ error: "Color is Required" });}
          if (!size){
            return res.send({ error: "Size is Required" });}
          if (!description){
            return res.send({ error: "Description is Required" });}
          if (!stock){
            return res.send({ error: "Stock is Required" });
          
          
        }
    

      const ExistingProduct = await Products.findOne({Productname,photo})
  
      
      if(ExistingProduct){
          return res.status(200).send({
              success:false,
              message:'Product is already created'
  
          })}


      const quantity =1
      const Product = new Products({photo,Productname,price,color,size,quantity,description,stock})
      await Product.save()
       return res.status(201).send({
          success : true,
          message : "Product created successfully",
          Product
       })
  
    } 
    
    catch (error) {
      console.log(error)
      res.status(500).send({
          success:false,
          message:'Error in Product Creation',
          error
  
      })
    }
    };



    export const allProductsController = async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1; 
        const perPage = 8; 
    
        const totalProducts = await Products.countDocuments();
        const totalPages = Math.ceil(totalProducts / perPage);
    
        const products = await Products.find({})
          .sort({ createdAt: -1 })
          .skip((page - 1) * perPage)
          .limit(perPage);
    
        res.status(200).send({
          success: true,
          totalPages,
          currentPage: page,
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: 'Error in getting Products',
          error,
        });
      }
    };
    

export const singleProductController= async(req,res)=>{

    try { 
        console.log(req)
        const product = await Products.findById(req.params.id )

        if (product == null || !req.params.id){

            return res.status(400).send({
                success:false,
                message:"Product doesnot exist"
            })
        }
        res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      });
            
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting product",
            error
        })
        
    }


}

export const deleteProductController = async (req, res) => {
    try {
      const product = await Products.findByIdAndDelete({_id:req.params.id});
  
      if (product == null || !req.params.id) {
        return res.status(400).send({
          success: false,
          message: "Product does not exist",
        });
      }
  
      res.status(200).send({
        success: true,
        message: "Product Deleted successfully",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in deleting product",
        error,
      });
    }
  };
  

export const UpdateProductController = async (req, res) => {
    try {
        const updateableFields = [
            "photo",
            "Productname",
            "price",
            "color",
            "size",
            "description",
            "stock",
        ];

        const checkProduct = await Products.findById(req.params.id);

        if (checkProduct === null || !req.params.id) {
            return res.status(400).send({
                success: false,
                message: "Product does not exist",
            });
        }

        const updatedFields = {};

        for (const field of updateableFields) {
            if (req.body[field] !== undefined) {
                updatedFields[field] = req.body[field];
            } else {
                updatedFields[field] = checkProduct[field];
            }
        }

        const product = await Products.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true }
        );

        return res.status(201).send({
            success: true,
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating product",
            error,
        });
    }
};


 

  export const updateProductStock = async (req, res) => {
    try {
      const { stock } = req.body;
      const updatedProduct = await Products.findByIdAndUpdate(
        req.params.id,
        { stock: stock },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).send({
          success: false,
          message: 'Product not found',
        });
      }
  
      res.status(200).send({
        success: true,
        message: 'Product updated successfully',
        updatedProduct,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'An error occurred while updating the product',
      });
    }
  };



  export const searchProductController = async (req, res) => {
    const { query } = req.query;

  try {
    const products = await Products.find({
      $or: [
        { Productname: { $regex: query, $options: 'i' } }, // Case-insensitive search
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const sortByPriceController= async(req,res)=>{

  const { sortBy } = req.query;

  try {
    let products;

    if (sortBy === 'lowToHigh') {
      products = await Products.find().sort({ price: 1 });
    } else if (sortBy === 'highToLow') {
      products = await Products.find().sort({ price: -1 });
    } else {
      products = await Products.find();
    }

    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const allProductsController2 = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 8;
    const sortQuery = req.query.sort; // Get the sortQuery from the frontend

    const totalProducts = await Products.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    let sortOption = { createdAt: -1 }; // Default sort by createdAt in descending order

    if (sortQuery === 'lowToHigh') {
      sortOption = { price: 1 }; // Sort by price in ascending order
    } else if (sortQuery === 'highToLow') {
      sortOption = { price: -1 }; // Sort by price in descending order
    }

    const products = await Products.find({})
      .sort(sortOption) // Apply the chosen sort option
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(200).send({
      success: true,
      totalPages,
      currentPage: page,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting Products',
      error,
    });
  }
};

  
