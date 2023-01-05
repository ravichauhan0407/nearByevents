import React, { useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import './Description.css'
import {Row,Col, Container}  from 'react-bootstrap'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { localDate } from '../helper/LocalDate.js';

import {toast} from 'react-hot-toast'

const Description = () => {

     const {id}=useParams()

    const [eventDetail,setIsLoading] =useState({isLoading:true,city: "",
    college: "",
    description: "",
    endTime: "",
    imgUrl: "",
    startTime: "",
    title:""})
    useEffect(()=>{
           const getEvent=async ()=>{
             return fetch(`/api/get-Event/${id}`,{
              method:'GET'
            })
            .then((res)=>
            {   
                 return res.json();
            })
            .catch((err)=>
            {
                 toast.error('Something got wrong!')
            })
          }

           getEvent().then((res)=>{

                  if(res.status)
                  {
                       setIsLoading({isLoading:false,...res.event})
                  }
                  else
                  {
                       
                       toast.error('Something got wrong!')
                  }
          })
        },[id])

     


  return (
    <>
         {!eventDetail.isLoading&&
         <div>
         <img  alt="Images are not showing becasue Heroku server cleaned up" className='description-img' src={`${eventDetail.imgUrl}`}/> 
         <div className='description-page-body'>
              <div className='title'><h1>{eventDetail.title} | {eventDetail.college}</h1></div>
            <Container>
              <Row xs={1} sm={2} md={3}>
                <Col><LocationOnIcon/>city:{eventDetail.city}</Col>
                <Col><EventAvailableIcon/>Start Time:{localDate(eventDetail.startTime)}</Col>
                <Col><EventAvailableIcon/>End Time:{localDate(eventDetail.endTime)}</Col>
              </Row>
              </Container>
              <hr style={{color:'black',height: 2}}/>
              <div className='des'>Description</div>
              <div>{eventDetail.description}</div>
         </div>
         </div>
         }
    </>
  )
}

export default Description