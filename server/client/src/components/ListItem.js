import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from './Card';
const ListItem = ({list}) => {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  

  return (
    <div>
    {(list.length>0)&&(<Carousel
  swipeable={true}
  draggable={true}
  responsive={responsive}
  itemClass="px-1"
>
    {list.map((item) => {
        return (
           <Card item={item} key={item._id}/>
    )})}
     </Carousel>)
}
</div>
  )
}

export default ListItem