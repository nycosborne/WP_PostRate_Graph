
import { FETCH_WP_DATA } from '../actions/index';

export default function (state = [], action ) {
  switch (action.type) {
    case FETCH_WP_DATA:

    // return [action.payload.data];
    // return state.push([action.payload.data]);
    //this won't work never push pop state

     // return state.concat([action.payload.data]);
     //this work concat will not mutate

     return [ action.payload.data, ...state];
     //this works using ES6 syntext
  }
  return state;
}
