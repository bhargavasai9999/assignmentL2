import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()
const api=axios.create({
    baseURL:'https://api.unsplash.com',
    headers:{
        "Accept-Version": 'v1',
        "Authorization": `Client-ID ${process.env.ACCESS_KEY}`
    }
    
})

export default api