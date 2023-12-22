import { Router } from "express";
const mercadoPago = Router()
import dotenv from 'dotenv'
import mercadopago from "mercadopago";


dotenv.config()

mercadopago.configure({
    access_token:process.env.MERCADOPAGO_KEY
})

 export const routeMp = mercadoPago.post('/', async (req,res)=>{
     let {totalAmount} = req.body
   
   
   
    
        const preference ={
            items:[{
                title: 'Productos',
                unit_price: Number(totalAmount) ,
                currency_id: 'ARS',
                quantity:1
            }],
            back_urls:{
                success: 'http://localhost:3000/',
                failure: 'http://localhost:3000/',
            },
            auto_return:'approved',
            binary_mode:true,
        }

        mercadopago.preferences.create(preference).then((response)=> res.status(200).send({response})).catch((error)=> res.status(400).send({error:error.message}))
   
    
})







 // const products = arrayProducts.map((product)=>{
    //     return{
    //         title:product.nombre,
    //         unit_price: amount ,
    //         currency_id:'ARS',
    //         quantity:1
    //     }
    // })

