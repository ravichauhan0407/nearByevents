import React, { useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import './Description.css'
import {Row,Col, Container}  from 'react-bootstrap'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { localDate } from './helper/LocalDate.js';

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
             return fetch(`/get-Event/${id}`,{
              method:'GET'
            })
            .then((res)=>
            {
                 return res.json();
            })
            .catch((err)=>
            {
                 console.log(err)
            })
          }

           getEvent().then((res)=>{
                  setIsLoading({isLoading:false,...res})
          })
        },[])

     


  return (
    <>
         {!eventDetail.isLoading&&
         <div>
         <img className='img' src={`http://localhost:8000${eventDetail.imgUrl}`}/> 
         <div className='body'>
              <div className='title'>{eventDetail.title} | {eventDetail.college}</div>
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