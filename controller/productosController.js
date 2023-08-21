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
        const productId = parseInt(req.body.product_id); // Parsear el ID del producto a entero
        const { artículo, descripción, precio, img } = req.body;

        // Utilizar map para crear un nuevo array de productos con el producto actualizado
        const nuevosProductos = productos.map(producto => {
            if (producto.id === productId) {
                return {
                    ...producto,
                    artículo,
                    descripción,
                    precio,
                    img: req.file ? req.file.filename : producto.img
                };
            } else {
                return producto;
            }
        });

        // Guardar los cambios en el archivo JSON
        fs.writeFileSync(productosFilePath, JSON.stringify(nuevosProductos, null, 2)); // Utiliza writeFileSync para asegurar la escritura sincrónica

        res.redirect("/");
    }
};

module.exports = productosController;