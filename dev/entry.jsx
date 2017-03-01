import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import components

// Counter
// import { store, Counter } from './redux-counter/Counter.js';

// TodoList
import store from './TodoList/reducer.js';
import TodoList from './TodoList/components/App';

ReactDOM.render(
	<Provider store={store}>
		{/*<Counter />*/}
		<TodoList />
	</Provider>,
	document.getElementById('root')
);
