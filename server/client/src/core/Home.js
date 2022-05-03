import React, { useEffect, useState } from 'react'
import EventsList from '../components/EventsList'
import { fetchLiveEvent, fetchPastEvent, fetchUpcommingEvent } from '../helper/FetchEvent'


const Home = () => {
     
    
     const [liveEventList,setLiveEventList]=useState([]);
     const [pastEventList,setPastEventList]=useState([]);
     const [upcommingEventList,setUpcommingEventList]=useState([])


    useEffect(()=>
    {
       fetchLiveEvent({city:''}).then((data)=>
       {
             setLiveEventList(data)
       })
      fetchPastEvent({city:''}).then((data)=>
      {
           setPastEventList(data)
      })
      fetchUpcommingEvent({city:''}).then((data)=>
      {
          setUpcommingEventList(data)

      })

    },[])

    console.log(pastEventList)

   


  
  return (
    <div className='page'>
       <div className='event__list'><EventsList  list={liveEventList} title="Live Events" link="live-events"/></div>
       <div className='event__list'><EventsList  list={upcommingEventList} title="Upcoming Events" link="upcoming-events"/></div>
       <div className='event__list'><EventsList  list={pastEventList} title="Past Events" link="past-events"/></div>

    </div>
  )
}

export default Home