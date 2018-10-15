import axios from 'axios';

const ROOT_URL =`http://nycosborne.com/wp-json/wp/v2/posts`;

export const FETCH_WP_DATA = 'FETCH_WP_DATA';

export function fetchWpData() {
  const request = axios.get(ROOT_URL);

  return{
    type:  FETCH_WP_DATA,
    payload: request
  };
}
