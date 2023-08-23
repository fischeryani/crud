const router = require("express").Router();
const productosController = require("../controller/productosController");
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });



router.post('/create', upload.single('image'), productosController.stock);

router.get('/', productosController.list);

router.get("/create", productosController.create)
router.post("/create", productosController.stock)

// Utiliza el formato correcto para capturar el ID en la URL
router.get('/edit/:id', productosController.edit); 
router.patch('/update/:id', productosController.update); // Cambia la ruta para la actualización

router.post('/delete/:id', productosController.destroy);

router.post('/upload', upload.single('image'), (req, res) => {
    // Access image in req.file
  })

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')  
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  // const upload = multer({ storage: storage });
  



module.exports = router;