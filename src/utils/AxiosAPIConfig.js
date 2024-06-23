import axios from "axios";
const api=axios.create({
    baseURL:'https://api.unsplash.com',
    headers:{
        "Accept-Version": 'v1',
        "Authorization": `Client-ID RgwwpsIULZgawKXH1kUGSHT672KgPj8CPz6KXxQzM18`
    }
    
})

export default api