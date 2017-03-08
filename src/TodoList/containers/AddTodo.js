import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import store from '../reducer.js';

let AddTodo = ({ dispatch }) => {
    let _input;
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                console.log(store.getState());
                if (!_input.value.trim()) {
                    return
                }
                dispatch(addTodo(_input.value));
                _input.value = '';
            }}>
                <input ref={el => _input = el} />
                <button type='submit'> Add Todo </button>
            </form>
        </div>
    )
}

AddTodo = connect()(AddTodo);

export default AddTodo;
