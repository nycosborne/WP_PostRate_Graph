import { combineReducers } from 'redux';
import PostReducer from './reducers_post';

const rootReducer = combineReducers({
  posts: PostReducer
});

export default rootReducer;
