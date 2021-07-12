import axios from "axios"
//https://api-calculator-gpa.herokuapp.com/
//http://localhost:6969/
const url = `https://api-calculator-gpa.herokuapp.com/`;
const API = axios.create({
    baseURL: url,
})


export const ApiService = {
    postData(params = {}) {
        return API.post('get-data', params);
    }
}

