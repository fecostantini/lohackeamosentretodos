import React, { Fragment } from 'react';

import Header from '../Header';
import Footer from '../Footer';
import Noticias from '../Noticias';

function index() {
	return (
		<Fragment>
			<Header />
			<Noticias />
			<Footer />
		</Fragment>
	);
}

export default index;
