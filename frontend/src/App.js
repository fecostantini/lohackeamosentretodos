import React from 'react';

function App() {
	return (
		<div className='App'>
			<iframe
				title='covid19-graph'
				src='https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6'
				style={{ display: 'block', border: 0 }}
				scrolling='no'
				class='d-none d-sm-block'
				width='100%'
				height='600px'
			></iframe>
		</div>
	);
}

export default App;
