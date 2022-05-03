const axios = require('axios').default;

export const fetchUpcommingEvent=async ({city})=>
{
        const response =await axios.get(`/get-uppcomming-Events/?city=${city}`)
       
        return response.data;
}

export const fetchLiveEvent=async ({city})=>
{
        const response =await axios.get(`/get-live-Events/?city=${city}`)

        return response.data;
}

export const fetchPastEvent=async ({city})=>
{
        const response =await axios.get(`/get-past-Events/?city=${city}`)
        return response.data
}

