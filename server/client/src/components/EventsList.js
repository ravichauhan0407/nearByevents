import React from 'react'
import ListHeader from './ListHeader'
import ListItem from './ListItem'

const EventsList = ({list,title,link}) => {
  return (
     <>
       <ListHeader  title={title} link={link}/>
       <ListItem list={list}/>
     </>
  )
}

export default EventsList