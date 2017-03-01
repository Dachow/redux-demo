import React from 'react';
import { connect } from 'react-redux';
import AddTodo from '../components/AddTodo.jsx'
import TodoList from '../components/TodoList.jsx'
import Footer from '../components/Footer.jsx'
import { addTodo, completeTodo, setVisibilityFilter, VisibiltyFilters } from '../actions'


class App extends React.Component {
    render() {
        const { dispatch, visibleTodos, visibilityFilter } = this.props;
        return (
            <div>
                <AddTodo 
                    onAddClick={text=>
                        dispatch(addTodo(text))
                } />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={index=>
                        dispatch(CompleteTodo(index))
                } />
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={nextFilter=>
                        dispatch(setVisibilityFilter(nextFilter))
                } />
            </div>
        )
    }
}

    function selectTodos(todos, filter) {
        switch (filter) {
            case VisibiltyFilters.SHOW_ALL:
                return todos
            case VisibiltyFilters.SHOW_COMPLETED:
                return todos.filter(todo => todo.completed)
            case VisibiltyFilters.SHOW_ACTIVE:
                return todos.filter(todo => !todo.completed)
            default:
                break;
        }
    }

    function select(state) {
        return {
            visibleTodos: selectTodos(state.todos, state.visibilityFilter),
            visibilityFilter: state.visibilityFilter
        }
    }

export default connect(select)(App);