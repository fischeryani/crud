const router = require("express").Router();
const productosController = require("../controller/productosController");

router.get('/', productosController.list);

router.get("/create", productosController.create)
router.post("/create", productosController.stock)

router.get('/edit', productosController.edit);
router.post('/update', productosController.update);

module.exports = router; 