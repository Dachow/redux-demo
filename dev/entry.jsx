import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

// import components

// Counter
import { store, Counter } from './counter/Counter.js';

ReactDOM.render(
	<Provider store={store}>
		<Counter />
	</Provider>,
	document.getElementById('root')
);