import React from 'react'
import './index.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import {useNavigate} from 'react-router-dom'

const ListHeader = ({title,link}) => {

   const  navigate=useNavigate();

   const navigateTo=()=>
   {
         navigate(`events/${link}`)
   }
  return (
    <div className='header'>
      <ul className='list__items'>
          <li className='list__item'>{title}</li>
          <li className='list__item'><button onClick={navigateTo} className='button'><ArrowForwardIcon fontSize="large"/></button></li>
      </ul>
</div>
  )
}

export default ListHeader