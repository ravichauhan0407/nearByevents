import React from 'react'
import { useNavigate} from 'react-router-dom'
import { localDate } from '../helper/LocalDate'
import './index.css'
const CustomCard = ({item}) => {
  
  let shortDescription=item.description.substring(0,50);
  const navigate=useNavigate()
  const navigatetoDescrption=(_id)=>
  {
      navigate(`/description/${_id}`)
  }
  return (
    <div className='card-link' onClick={()=>{navigatetoDescrption(item._id)}}>
    <div className="card text-left" key={item._id}>
                <img alt="Image is deleted by hosted server" className="media-img card-img-top" src={`${item.imgUrl}`}></img>
                <div className="card-body">
                    <h6 className="card-title">{item.title} | {item.college} | {item.city}</h6>
                    <p className="card-text">Starts on : {localDate(item.startTime)}</p>
                    <p>{shortDescription}</p>
                </div>
             </div>
    </div>
  )
}

export default CustomCard