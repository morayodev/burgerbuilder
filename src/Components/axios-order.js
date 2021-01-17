import axios from 'axios';

const instance = axios.create({
  baseURL: "https://myreact-e6be0.firebaseio.com/"
});
   



export default instance
