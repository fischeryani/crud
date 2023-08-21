const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static("public"));


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


