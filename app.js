const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');


const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
 //app.use(express.static("public"));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => console.log("Server corriendo en el puerto 3000"));

// app.get("/", (req, res) => {
//     res.render(__dirname + "/views/home.ejs")
// });

// -----------------------------------------------------

const routerProductos = require ("./router/productosRouter")

app.use("/", routerProductos) 


const productosController = require('./controller/productosController');
app.get('/edit', productosController.edit);
app.post('/update', productosController.update);



const multer  = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img')  
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    
   
  // Procesa la imagen aquí (si es necesario)
      res.send('Imagen cargada exitosamente'); // Envía una respuesta al cliente
  });