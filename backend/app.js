const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3210;
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors());

// headers
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // actualizar para que coincida con el dominio de la aplicación que hace las peticiones
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// rutas
app.use(require('./routes'));

app.listen(port, () => {
	console.log(`Corriendo en el puerto ${port}`);
});
