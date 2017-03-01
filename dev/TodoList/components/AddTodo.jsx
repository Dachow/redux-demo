import React from 'react';

export default class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        const node = this._input;
        const text = node.value.trim();
        this.props.onAddClick(text);
        node.value = '';
    }
    render() {
        return (
            <div>
                <input type="text" ref={(el)=>this._input = el} />
                <button onClick={(e)=>this.handleClick(e)}>Add</button>
            </div>
        )
    }
}