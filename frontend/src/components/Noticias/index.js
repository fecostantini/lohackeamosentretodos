import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const Noticias = () => {
	const [noticiasOMS, setNoticiasOMS] = useState([]);
	const [noticiasSADI, setNoticiasSADI] = useState([]);

	useEffect(async () => {
		const URL_OMS = 'http://localhost:3210/webscrapping/getUltimasNoticiasOMS';
		const URL_SADI = 'http://localhost:3210/webscrapping/getUltimasNoticiasSADI';

		const respuestaOMS = await axios.get(URL_OMS);
		setNoticiasOMS(respuestaOMS.data.noticias);
		const respuestaSADI = await axios.get(URL_SADI);
		setNoticiasSADI(respuestaSADI.data.noticias);
	}, []);

	const CardNoticia = ({ noticia }) => (
		<div
			className='card col-lg-3 col-md-4 col-12'
			onClick={() => {
				window.location.href = noticia.url;
			}}
		>
			<a className='btn stretched-link hidden' href={noticia.url}></a>
			{noticia.imagen ? (
				<div className='container mt-2'>
					<img
						src={noticia.imagen}
						className='card-img-top'
						alt='imagen'
						style={{ maxWidth: 'auto', height: '200px', objectFit: 'contain' }}
					></img>
				</div>
			) : null}
			<div className='card-body'>
				<h5 className='card-title col'>{noticia.titulo}</h5>

				<p class='card-text col'>{noticia.bajada ? noticia.bajada : null}</p>
			</div>

			<div className='col container align-items-baseline'>
				<p class='card-text col text-right mb-3'>
					<small class='text-muted align-self-baseline'>{noticia.fecha}</small>
				</p>
			</div>
		</div>
	);

	return (
		<Fragment>
			<div className='row'>
				<div className='col-12'>
					<iframe
						src='https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6'
						style={{ display: 'block', border: 0 }}
						scrolling='no'
						class='d-none d-sm-block'
						width='100%'
						height='600px'
					></iframe>
				</div>
				<div className='col-12 text-center my-3 '>
					<h1>Últimas noticias de la OMS</h1>
				</div>
				{noticiasOMS.map(noticiaOMS => (noticiaOMS ? <CardNoticia noticia={noticiaOMS} /> : null))}
			</div>

			<div className='row my-5'>
				<div className='col-12 text-center my-3 '>
					<h1>Últimas noticias de la SADI</h1>
				</div>
				{noticiasSADI.map(noticiasSADI => (noticiasSADI ? <CardNoticia noticia={noticiasSADI} /> : null))}
			</div>
		</Fragment>
	);
};

export default Noticias;
