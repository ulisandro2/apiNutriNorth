import db from "../database/db.js";
import {  DataTypes } from "sequelize";

const ProductModel = db.define('proteinas',{
    nombre: {type:DataTypes.STRING},
    marca: {type:DataTypes.STRING},
    stockMax: {type: DataTypes.NUMBER},
    stockMin: {type: DataTypes.NUMBER},
    stock: {type: DataTypes.NUMBER},
    precio: {type: DataTypes.NUMBER},
    sabor: {type:DataTypes.STRING},
    descripcion:{type:DataTypes.TEXT},
    categoria:{type:DataTypes.STRING},
    img:{type:DataTypes.TEXT}

});

export default ProductModel;