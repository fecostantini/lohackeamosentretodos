var express = require('express');
var rutasWebScrapping = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

const siteUrl = 'https://www.who.int';
const scrappingUrl = `${siteUrl}/es/news-room/releases`;

const fetchData = async () => {
	const pagina = await axios.get(scrappingUrl);
	return cheerio.load(pagina.data);
};

const getNoticias = async () => {
	var noticias = [];
	await fetchData().then(async $ => {
		$('#PageContent_C027_Col00 > .vertical-list')
			.find($('.list-view--item'))
			.each((index, element) => {
				const titulo = $('a', element).attr('aria-label');
				const fecha = $('a > div.info > div.date > span', element).text();
				const imagen = siteUrl + $('a > div > div > div', element).attr('data-image');
				const url = siteUrl + $('a', element).attr('href');

				noticias.push({ titulo, fecha, imagen, url });
			});
	});
	return noticias;
};

rutasWebScrapping.get('/getUltimasNoticiasOMS', function(req, res) {
	getNoticias().then(noticias => {
		res.send({ noticias });
	});
});

module.exports = rutasWebScrapping;
