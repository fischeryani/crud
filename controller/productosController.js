const fs = require('fs');
const path = require('path');
const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
const multer = require('multer');

const productosController = {
    list: (req, res) => {
        res.render('home', { productos });
    },

    create: (req, res) => {
        res.render("productos/creacionProd");
    },

    stock: (req, res) => {
        const { artículo, descripción, precio, img } = req.body;
        const nuevoProduct = {
            id: productos.length + 1,
            artículo,
            descripción,
            precio,
            img: req.file ? req.file.filename : 'default-image.png'
        };

        productos.push(nuevoProduct);
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
        res.redirect("/");
    },

    edit: (req, res) => {
        const productId = req.query.id; // Obtener el ID del producto de los parámetros de la URL
        const productToEdit = productos.find(product => product.id === parseInt(productId));

        if (!productToEdit) {
            return res.status(404).send("Producto no encontrado");
        }

        res.render("productos/edit", { editProduct: productToEdit });
    },

    update: (req, res) => {
        const productId = parseInt(req.body.product_id); // Parsear el ID del producto a entero
        const { artículo, descripción, precio, img } = req.body;
    
        // Encuentra el producto a actualizar en el array de productos
        const productToEdit = productos.find(producto => producto.id === productId);
    
        if (!productToEdit) {
            return res.status(404).send("Producto no encontrado");
        }
    
        // Actualiza los datos del producto
        productToEdit.artículo = artículo;
        productToEdit.descripción = descripción;
        productToEdit.precio = precio;
        productToEdit.img = img;
        // Actualiza la imagen si se proporciona
        if (req.file) {
            productToEdit.img = req.file.filename;
        }
    
        // Guarda los cambios en el archivo JSON
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, 2));
    
        console.log('Cambios guardados:', productToEdit); // Agrega este console.log para verificar
    
        res.redirect("/");
    },


    
    destroy: (req, res) => {
        try {
            const id = req.params.id;
    
            // Leer los productos existentes
            const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
    
            // Filtrar los productos eliminando el que tenga el ID proporcionado
            const finalProducts = products.filter(producto => producto.id != id);
    
            // Escribir los productos actualizados en el archivo
            fs.writeFileSync(productosFilePath, JSON.stringify(finalProducts, null, ' '));
    
            console.log('Producto eliminado:', id); // Agrega este mensaje para verificar que se esté ejecutando correctamente
    
            res.redirect('/');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).send('Error al eliminar el producto');
        }
    
    }
}
module.exports = productosController;