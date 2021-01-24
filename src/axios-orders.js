import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burgerbuilder-baf3b.firebaseio.com/'
});

export default instance;