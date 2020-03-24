import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
	useEffect(async () => {
		const URL = 'http://localhost:3210/twitter/getInformacionCOVID';
		const resp = await axios.get(URL);

		setCantidadInfectados(resp.data.infectados);
		setCantidadMuertos(resp.data.muertos);
		setCantidadRecuperados(resp.data.recuperados);
	}, []);

	const [cantidadInfectados, setCantidadInfectados] = useState(0);
	const [cantidadMuertos, setCantidadMuertos] = useState(0);
	const [cantidadRecuperados, setCantidadRecuperados] = useState(0);

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container'>
				<Link to='/' className='navbar-brand'>
					INFO COVID-19{' '}
					<img
						alt='arg'
						style={{ width: '4vw', heigth: '4vh' }}
						src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/241/flag-argentina_1f1e6-1f1f7.png'
					></img>
				</Link>
				<ul className='navbar-nav mr-auto'>
					<NavLink to='/mapa' className='nav-link' activeClassName='active'>
						Mapa
					</NavLink>
				</ul>

				<form className='form-inline my-2 my-lg-0'>
					<span className='text-success font-weight-light'>Recuperados: {cantidadRecuperados}</span>
					<span className='text-warning mx-2 font-weight-light'>Infectados: {cantidadInfectados} </span>
					<span className='text-danger mx-2 font-weight-light'>Muertos: {cantidadMuertos}</span>
				</form>
			</div>
		</nav>
	);
};

export default Header;
