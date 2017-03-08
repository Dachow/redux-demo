import React, { Component } from 'react';

export default class Picker extends Component {
  render() {
    // 定义了onChange
    const { value, onChange, options } = this.props;

    return (
      <span>
        <h1>{value}</h1>
        {/* 调用了onChange并向其传参*/}
        <select name="" id="" onChange={e => onChange(e.target.value) } value={value}>{options.map(option =>
          <option value={option} key={option}>{option}</option>
        )}</select>
      </span>
    )
  }
}
