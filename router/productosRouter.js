const router = require("express").Router();
const productosController = require("../controller/productosController");

router.get('/', productosController.list);

router.get("/create", productosController.create)
router.post("/create", productosController.stock)

// Utiliza el formato correcto para capturar el ID en la URL
router.get('/edit/:id', productosController.edit); 
router.patch('/update/:id', productosController.update); // Cambia la ruta para la actualización

module.exports = router;