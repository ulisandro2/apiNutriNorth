import Express from 'express';
import cors from 'cors'
import productRoutes from './routes/RoutesProducts.js'
import ProductModel from './models/ProductModel.js';
import dotenv from 'dotenv'
import { routeMp } from './routes/mpRoute.js';
dotenv.config()
import userRoutes from './routes/routesUser.js'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';


const PORT = process.env.PORT || 3000

const app = Express();

app.use((_req, res,next)=>{
     res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
     res.header('Access-Control-Allow-Credentials', 'true');
     res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept,Authorization')
     res.header('Access-Control-Allow-Methods', 'GET, POST , OPTIONS , HEAD, PUT')
     next();
 });


app.use(cors());
app.use(Express.json());
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/mp' , routeMp)

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.use(Express.static(path.join(__dirname, './build')));

// // Manejar todas las demás rutas y redirigirlas al index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './build', 'index.html'));
// });

app.get('/',(req,res)=>{
     res.send('hola mundo')
})

app.listen(PORT ,()=>{
     console.log('Server running on port', PORT)
});

const products = await ProductModel.findAll({
     attributes: ['id' , 'stock' , 'stockMin' , 'nombre' , 'marca','precio','categoria', 'sabor','img','descripcion']
});

let productsStock = {}
let productMinStock= {}

products.forEach(product => {
     productsStock[product.dataValues.id] = product.dataValues.stock;
});

products.forEach(product => {
     productMinStock[product.dataValues.id] = {stockMin : product.dataValues.stockMin ,nombre: product.dataValues.nombre , marca: product.dataValues.marca , precio:product.dataValues.precio, sabor:product.dataValues.sabor, descripcion:product.dataValues.descripcion, categoria:product.dataValues.categoria,img:product.dataValues.img};
})

console.log(productMinStock)
export {productMinStock,productsStock};