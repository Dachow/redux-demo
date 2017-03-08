import React, {Component} from 'react';

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}>
            <a href={post.url} target='_blank'>
              {post.title}
            </a>
            {' '}
            {post.author}
          </li>
          // title?
          // title是fetch返回的json数组中定义的
        )}
      </ul>
    )
  }
}
