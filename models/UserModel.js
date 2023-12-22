import db from "../database/db.js";//se importa la base de datos para extraer info

import { DataTypes } from "sequelize";//tipo de dato extraido de la base de datos

//El modelo de todos los usuarios extrayendo todos sus campos
const UserModel = db.define ('users',{
    nombre: {type: DataTypes.STRING},
    contrasena: {type: DataTypes.STRING},
    telefono: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
});

export default UserModel;