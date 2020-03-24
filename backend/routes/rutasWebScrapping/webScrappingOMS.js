const axios = require('axios');
const cheerio = require('cheerio');

const siteUrl = 'https://www.who.int';
const scrappingUrl = `${siteUrl}/es/news-room/releases`;

const fetchData = async () => {
	const pagina = await axios.get(scrappingUrl);
	return cheerio.load(pagina.data);
};

const CANTIDAD_NOTICIAS = 8;

const getNoticiasOMS = async () => {
	var noticiasOMS = [];

	await fetchData().then(async $ => {
		// Recorremos el div que contiene las noticias
		$('#PageContent_C027_Col00 > .vertical-list')
			.find($('.list-view--item'))
			.each((index, element) => {
				if (index < CANTIDAD_NOTICIAS) {
					const titulo = $('a', element).attr('aria-label');
					const fecha = $('a > div.info > div.date > span', element).text();
					const imagen = siteUrl + $('a > div > div > div', element).attr('data-image');
					const url = siteUrl + $('a', element).attr('href');

					noticiasOMS.push({ titulo, fecha, imagen, url });
				}
			});
	});
	return noticiasOMS;
};

module.exports = getNoticiasOMS;
