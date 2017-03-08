import React, { Component } from 'react';
import {connect} from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions'
import Picker from '../components/Picker.jsx';
import Posts from '../components/Posts.jsx'

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    // props中默认注入dispatch
    console.log(this.props)
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentWillReceiveProps(nextProps) {
    // 接受的selectedSubreddit不同时调用
    // 如果connect中传入mapDispatchToProps，自带优化，不用判断？
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }
  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
  }
  handleRefreshClick(e) {
    e.preventDefault()

    const {dispatch, selectedSubreddit} = this.props;
    // 做什么
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker value={selectedSubreddit}
                onChange={this.handleChange}
                options={['reactjs', 'frontend']}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#" onClick={this.handleRefreshClick}>Refresh</a>
          }
          </p>
          {isFetching && posts.length === 0 &&
            <h2>Loading...</h2>
          }
          {!isFetching && posts.length === 0 &&
            <h2>Empty.</h2>
          }
          {posts.length > 0 &&
            <div style={{opacity: isFetching ? 0.5 : 1}}>
              <Posts posts={posts} />
            </div>
          }
      </div>
    )
}
}

function mapStateToProps(state) {
  console.log(state);
  // 来自combineReducers
  const { selectedSubreddit, postsBySubreddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }
  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp);
