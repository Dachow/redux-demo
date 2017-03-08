import { combineReducers } from 'redux';
import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS, ON_ERR } from './actions';

// reducer为什么能访问到state和action
// action是系统变量？
// action来自dispatch的参数

// 为下拉框的值，做action处理
function selectedSubreddit(state='reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

function posts(state={
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    case ON_ERR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [action.err]
      })
    default:
      return state
  }
}

function postsBySubreddit(state={}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        // 当前subreddit的键值
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}


export default combineReducers({
  postsBySubreddit,
  selectedSubreddit
})
