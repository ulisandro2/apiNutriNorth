import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config();



 const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST,DB_PORT} = process.env;




const db = new Sequelize({
    database:DB_NAME,
    username:DB_USER,
    password:DB_PASSWORD,
    host:DB_HOST,
    dialect:'mysql',
    port: DB_PORT,
    logging: console.log,
    define:{
        timestamps:false
    }
});


async function test(){
    try{
      await db.authenticate()
        console.log('conexcion exitosa con la base de datos');
    }catch(error){
        console.log(`El error es ${error}`);
    }
}

test()



export default db