import React from 'react'
import Pagination from '../components/Pagination'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {fetchUpcommingEvent } from '../helper/FetchEvent'
import SearchBox from '../components/SearchBox'
import { localDate } from '../helper/LocalDate'

const UpcomingEvents = () => {

  const [upcomingEventList,setLiveEventList]=useState([]);
  const [cityFilter,setCityFilter]=useState('')
  const [currentPage, setCurrentPage] = useState(1);

 useEffect(()=>
 {
    fetchUpcommingEvent({city:cityFilter}).then((data)=>
    {
         setLiveEventList(data)
    })
 },[cityFilter])

 const indexOfLastEvent = currentPage * 12;
 const indexOfFirstEvent = indexOfLastEvent - 12;
 const currentEvents =upcomingEventList.slice(0,1);


 const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div style={{padding:"20px"}}>
    <h1>Upcoming Events</h1>
    <SearchBox setCityFilter={setCityFilter}/>
   {currentEvents.length>0&&<div class="row">
    {currentEvents.map((item) => {
      let shortDescription=item.description.substring(0,50);
        return (
            <div className='col-3'><div className="card text-left" style={{marginBottom:"30px"}} key={item._id}>
                <img className="media-img card-img-top" style={{height:"120px"}} src={`http://localhost:8000${item.imgUrl}`} alt="Alt text"></img>
                <div className="card-body">
                    <h5 className="card-title">{item.title} | {item.college} | {item.city}</h5>
                    <p className="card-text">Starts on :{localDate(item.startTime)}</p>
                    <p>{shortDescription}.....
                    <Link to={`/description/${item._id}`}>Read More</Link></p>
                </div>
             </div>
             </div>
        )
    }) }
  </div>}
  <Pagination
        eventsPerPage={12}
        totalEvents={upcomingEventList.length}
        paginate={paginate}
      />
  </div>
  )
}

export default UpcomingEvents