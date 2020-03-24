import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Map from './components/Map';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' render={Home} />
				<Route exact path='/home' render={Home} />
				<Route exact path='/mapa' render={Map} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
