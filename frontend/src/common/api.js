import axios from "axios"

const url = `https://api-calculator-gpa.herokuapp.com/`;
const API = axios.create({
    baseURL: url,
})


export const ApiService = {
    post(params = {}) {
        return API.post('get-data', params);
    }
}

