import React from 'react'
import {Link} from 'react-router-dom'
import { localDate } from '../helper/LocalDate'

const Card = ({item}) => {
  
  let shortDescription=item.description.substring(0,50);
 
  return (
    <div className="card text-left" key={item._id}>
                <img className="media-img card-img-top" style={{height:"120px"}} src={`http://localhost:8000${item.imgUrl}`} alt="Alt text"></img>
                <div className="card-body">
                    <h5 className="card-title">{item.title} | {item.college} | {item.city}</h5>
                    <p className="card-text">Starts on : {localDate(item.startTime)}</p>
                    <p>{shortDescription}.....
                    <Link to={`/description/${item._id}`}>Read More</Link></p>
                </div>
             </div>
  )
}

export default Card