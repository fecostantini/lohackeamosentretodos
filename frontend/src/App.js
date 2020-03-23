import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" render={Home}/>
				<Route exact path="/home" render={Home}/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
