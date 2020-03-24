var express = require('express');
var rutasWebScrappingSADI = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

const siteUrl = 'https://www.sadi.org.ar';
const scrappingUrl = `${siteUrl}/coronavirus`;

const fetchData = async () => {
	const pagina = await axios.get(scrappingUrl);
	return cheerio.load(pagina.data);
};

const getNoticias = async () => {
	var noticiasSADI = [];

	await fetchData().then(async $ => {
		// Recorremos el div que contiene las noticias
		$('.tagItemList')
			.find($('.tagItemView'))
			.each((index, element) => {
                const titulo = $('.tagItemHeader > h2.tagItemTitle', element).text();
                const fecha = $('.tagItemHeader > span.tagItemDateCreated', element).text();
				const bajada = $('.tagItemBody > .tagItemIntroText > p', element).text()
				const url = siteUrl + $('.tagItemHeader > h2.tagItemTitle > a', element).attr('href');
                
                noticiasSADI.push({ titulo, fecha, bajada, url });
                
			});
	});
	return noticiasSADI;
};

rutasWebScrappingSADI.get('/getUltimasNoticiasSADI', function(req, res) {
	getNoticias().then(noticias => {
		res.send({ noticias });
	});
});

module.exports = rutasWebScrappingSADI;
