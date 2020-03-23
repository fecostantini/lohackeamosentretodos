var express = require('express');
var rutasTwitter = express.Router();

var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: 'VhJgrXS5wtQyCNgTr5QlIerrS',
	consumer_secret: 'ZzTDuZyyVIvkRx2oSqTsa8n0uXpT1EFdFeHNnIfRPTYgcy9Lk2',
	access_token_key: '2976886871-srjNKdREutHM2M1dIxrm6dgieK0jrcFcSGTCiKc',
	access_token_secret: 'n1SfKm62joTGhsuBMLaOvyzweWuMGqnzPJuDkoWiHkgb7'
});

var params = {
	user_id: '1232423370127527943',
	trim_user: 'true',
	exclude_replies: 'true',
	include_rts: 'false',
	count: 10,
	tweet_mode: 'extended'
};

// Devuelve el primer tweet que contenga la palabra 'Actualización'
const getUltimaActualizacion = tweets => {
	for (i = 0; i < tweets.length; i++) {
		const tweetActual = tweets[i];
		if (tweetActual.full_text.includes('Actualización')) return tweetActual;
	}
};

// Devuelve la cantidad de infectados y muertos en argentina en base al tweet informativo que se le pase
const getCantidadInfectadosYMuertos = tweet => {
	const lineas = tweet.full_text.split(`\n`); // Separamos el tweet en todas sus lineas
	for (i = 0; i < lineas.length; i++) {
		let lineaActual = lineas[i];

		// Buscamos la línea con los datos de Argentina (en el tweet aparece como AR)
		if (lineaActual.includes('AR')) {
			lineaActual = lineaActual.slice(6); // Removemos la parte que dice AR y la banderita, dejamos solo los núnmeros con el ataúd al medio.

			const infectados = parseInt(lineaActual.split('⚰️')[0]); // A la izquierda del ataúd está la cantidad de infectados
			const muertos = parseInt(lineaActual.split('⚰️')[1]); // A la derecha del ataúd está la cantidad de muertos

			return { infectados: infectados, muertos: muertos };
		}
	}
};

rutasTwitter.get('/getInformacionCOVID', function(req, res) {
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			const ultimaActualizacion = getUltimaActualizacion(tweets);
			const informacionCOVID = getCantidadInfectadosYMuertos(ultimaActualizacion);
			res.send(informacionCOVID);
		}
	});
});

module.exports = rutasTwitter;
