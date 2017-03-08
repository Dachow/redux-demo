import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import components

// Counter
// import { store, Counter } from './redux-counter/Counter.js';

// TodoList
// import store from './TodoList/reducer.js';
// import TodoList from './TodoList/components/App';

// Reddit
import Root from './reddit/containers/Root.js'

ReactDOM.render(
	/*<Provider store={store}>
		<Counter />
		<TodoList />
	</Provider>,*/
  <Root />,
	document.getElementById('root')
);
