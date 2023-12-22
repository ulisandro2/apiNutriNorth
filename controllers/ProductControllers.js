import ProductModel from "../models/ProductModel.js";
import { productsStock, productMinStock } from "../app.js";
import { where } from "sequelize";


export const getAllProducts = async (req,res)=>{
    try{
        const products = await ProductModel.findAll()
        res.json(products)
    }catch(error){
        res.json({message:error.message})
    }
}

// export const productCategory = async (req, res)=> {
//     const marca = req.params.marca;
//     try{
//          const products = await ProductModel.findAll({
//             where:{marca},
//          })
//          res.json(products)
//     }catch(error){
//            res.json({message:error.message})
//     }

// } 

export const getProduct = async (req,res)=>{
    try{
        const product = await ProductModel.findAll({
            where:{ id:req.params.id}
        })
        res.json(product[0])
    }catch(error){
        res.json({ message:error.message})
    }
}

export const createProduct = async (req,res)=>{
    try{
        await ProductModel.create(req.body)
        res.json({
            'message': 'registro creado'
        })
    }catch(error){
        res.json({message:error.message})
    }
}

export const updateProduct = async (req,res)=>{
    try{
        await ProductModel.update(req.body,{
            where: {id: req.params.id}
        })
        res.json({
            'message': 'registro actualizado'
        })
    }catch(error){
        res.json({message:error.message})
    }
}

export const deleteProduct = async (req,res)=>{
    try{
        await ProductModel.destroy(req.body,{
            where: {id: req.params.id}
        })
        res.json({
            'message': 'registro borrado'
        })
    }catch(error){
        res.json({message:error.message})
    }
}


export const bookProduct = async ( req, res) => {

   try{
    console.log(productsStock);
    if(req.query.f === 'unbook'){
        productsStock[req.params.id]++;
        return res.json('UnBooked');
    }else if(req.query.f === 'book'){
        if (productsStock[req.params.id] == 0) return res.json('Stockout')
        productsStock[req.params.id]--;
       return res.json('Booked');
    }
    res.status(400).json('Bad request')
   }catch(error){
    res.json({message:error.message})
   }

}



const updateContent = async (product , quantity) => {
    const stock = await ProductModel.findAll({
        attributes: ['id' , 'stock'],
        where: {id : product}
    })
    console.log(quantity);
    await ProductModel.update({stock : stock[0].dataValues.stock - quantity[product]},{
        where: {id:product}
    })
    
    
        
    
}


export const buyProducts = async (req, res) => {
    try {
        console.log(typeof(req.body));
        Object.keys(req.body).forEach(product => updateContent(product, req.body));
        res.json("Successful purchase");
    } catch (error) {
        res.json(error.message);   
    }
}



