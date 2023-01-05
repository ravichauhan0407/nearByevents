const axios = require('axios').default;

export const fetchUpcommingEvent=async ()=>
{
        const response =await axios.get(`/api/get-uppcomming-Events`)
       
        return response.data;
}

export const fetchLiveEvent=async ()=>
{
        const response =await axios.get(`/api/get-live-Events`)
        return response.data;
}

export const fetchPastEvent=async ()=>
{
        const response =await axios.get(`/api/get-past-Events`)
        return response.data
}

