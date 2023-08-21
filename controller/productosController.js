const fs = require('fs');
const path = require('path');
const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

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
        const productId = req.body.product_id; // Obtener el ID del producto del cuerpo de la solicitud
        const { artículo, descripción, precio, img } = req.body;

        // Encontrar el producto a editar en el array de productos
        const productToEdit = productos.find(product => product.id === parseInt(productId));

        if (!productToEdit) {
            return res.status(404).send("Producto no encontrado");
        }

        // Actualizar los datos del producto
        productToEdit.artículo = artículo;
        productToEdit.descripción = descripción;
        productToEdit.precio = precio;
        // Actualizar la imagen si se proporciona
        if (req.file) {
            productToEdit.img = req.file.filename;
        }

        // Guardar los cambios en el archivo JSON
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));

        res.redirect("/");
    }
};

module.exports = productosController;