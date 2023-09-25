import express  from "express";
import { ProductManager } from "./ProductManager.js";
import __dirname from './utils.js';

const app = express();
const PORT = 8080 ;
const productManager = new ProductManager(`${__dirname}/../Products.JSON`);

app.use(express.urlencoded({ extended: true }));

//     ------ Obtener Productos -------
app.get('/products', async (req, res) => {
    try {
        // limite de consulta
        const limit = req.query.limit; 
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit); 
            res.json({limitedProducts});
        } else {
            res.json({products});
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.' });
    }
});

// Ruta para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);

    if (isNaN(pid)) {
        res.status(400).json({ error: 'El ID del producto debe ser un número válido.' });
        return;
    }

    try {
        const product = await productManager.getProductById(pid);

        if (product) {
            res.json({product});
        } else {
            res.status(404).json({ error: 'Producto no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
});

// Iniciar el servidor

app.listen(PORT , ()=>{
    console.log(" escuchando puerto 8080 ")
})


async function runTests() {
    try {
        // Obtener todos los productos
        const response1 = await request.get('/products');
        console.log('Todos los productos:', response1.body);

        // Obtener los primeros 2 productos
        const response2 = await request.get('/products?limit=2');
        console.log('Primeros 2 productos:', response2.body);

        // Obtener un producto por ID
        const productId = 1;
        const response3 = await request.get(`/products/${productId}`);
        console.log(`Producto con ID ${productId}:`, response3.body);
    } catch (error) {
        console.error('Error', error);
    }
}

runTests();






