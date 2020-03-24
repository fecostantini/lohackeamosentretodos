var express = require('express');
var rutasWebScrapping = express.Router();
var getNoticiasOMS = require('./webScrappingOMS');
var getNoticiasSADI = require('./webScrappingSADI');

rutasWebScrapping.get('/getUltimasNoticiasOMS', function(req, res) {
	getNoticiasOMS().then(noticias => {
		res.send({ noticias });
	});
});

rutasWebScrapping.get('/getUltimasNoticiasSADI', function(req, res) {
	getNoticiasSADI().then(noticias => {
		res.send({ noticias });
	});
});

module.exports = rutasWebScrapping;
