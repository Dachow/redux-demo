import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

// import components
import reducer from './reducer.js';

// actions
function incrememt() {
	return {
		type: 'INCREMENT'
	}
}
function decrement() {
	return {
		type: 'DECREMENT'
	}
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


class Control extends React.Component {
	constructor() {
		super();
		this.incrememtHandle = this.incrememtHandle.bind(this);
		this.decrementHandle = this.decrementHandle.bind(this);
		this.syncIncre = this.syncIncre.bind(this);
	}
	// this.props.actions为父组件Counter
	incrememtHandle() {
		this.props.actions.a();
	}
	decrementHandle() {
		this.props.actions.b();
	}
	syncIncre() {
		setTimeout(function() {
			console.log(this);
			this.props.actions.a();
		}.bind(this), 2000); //bind this解决this指向问题。指向上面的constructor定义的this指向
	}
	render() {
		return (
			<div>
				<button onClick={this.incrememtHandle}>INCREMENT</button>
				<button onClick={this.decrementHandle}>DECREMENT</button>
				<button onClick={this.syncIncre}>syncIncre after 2s</button>
			</div>
		)
	}
}

class Counter extends React.Component {
    render() {
		const {actions, value} = this.props; // mapStateToProps 和 mapDispatchToProps两个函数返回的对象接口
		return (
			<div>
				<p>Now is: {value}</p>
				<Control actions={actions} />
			</div>
		)
    }
}


function mapStateToProps(state) {
	return {
		value: state
	}
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
			a: incrememt,
			b: decrement
		}, dispatch)
	}
}

Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

module.exports = {
	store,
	Counter
}