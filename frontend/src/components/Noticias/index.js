import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Noticias = () => {
	const history = useHistory();
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
			className='card col-lg-2 col-md-4 col-12'
			onClick={() => {
				window.location.href = noticia.url;
			}}
		>
			{noticia.imagen ? (
				<div style={{ height: '280px' }}>
					<img src={noticia.imagen} className='card-img-top' alt='imagen'></img>
				</div>
			) : null}
			<div className='card-body'>
				<a className='btn stretched-link'>
					<h5 className='card-title'>{noticia.titulo}</h5>
				</a>
				<p class='card-text'>
					<small class='text-muted'>{noticia.fecha}</small>
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
			<div className='row'>
				<div className='col-12 text-center my-3 '>
					<h1>Últimas noticias del SADI</h1>
				</div>
				{noticiasSADI.map(noticiasSADI => (noticiasSADI ? <CardNoticia noticia={noticiasSADI} /> : null))}
			</div>
		</Fragment>
	);
};

export default Noticias;
