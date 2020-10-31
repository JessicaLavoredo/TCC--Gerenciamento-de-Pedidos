import axios from 'axios';
const Api = axios.create({
    baseURL: 'http://localhost/TCC--Gerenciamento-de-Pedidos/Backend'
});
export default Api