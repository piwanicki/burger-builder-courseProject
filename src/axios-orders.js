import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-db.firebaseio.com/'
});

export default instance;
