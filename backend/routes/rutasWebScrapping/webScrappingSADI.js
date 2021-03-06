const axios = require('axios');
const cheerio = require('cheerio');

const siteUrl = 'https://www.sadi.org.ar/';
const scrappingUrl = `${siteUrl}/coronavirus`;

const fetchData = async () => {
	const pagina = await axios.get(scrappingUrl);
	return cheerio.load(pagina.data);
};

const CANTIDAD_NOTICIAS = 8;

const getNoticiasSADI = async () => {
	var noticiasSADI = [];

	await fetchData().then(async $ => {
		// Recorremos el div que contiene las noticias
		$('div.g-content > div.platform-content.row-fluid > div.span12 > #k2Container.tagView > .tagItemList')
			.find($('.tagItemView'))
			.each((index, element) => {
				if (index < CANTIDAD_NOTICIAS) {
					const titulo = $('.tagItemHeader > h2.tagItemTitle', element).text();
					const fecha = $('.tagItemHeader > span.tagItemDateCreated', element).text();
					const bajada = $('.tagItemBody > .tagItemIntroText > p', element).text();
					const url = siteUrl + $('.tagItemHeader > h2.tagItemTitle > a', element).attr('href');

					noticiasSADI.push({ titulo: titulo.trim(), fecha: fecha.trim(), bajada: bajada.trim(), url });
				}
			});
	});
	return noticiasSADI;
};

module.exports = getNoticiasSADI;
