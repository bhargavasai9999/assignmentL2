import axios from "axios";
const api=axios.create({
    baseURL:'https://api.unsplash.com',
    headers:{
        "Accept-Version": 'v1',
        "Authorization": `Client-ID YOUR_ACCESS_KEY`
    }
    
})

export default api