import React, { useEffect, useRef, useState } from "react";
import {
  fetchLiveEvent,
  fetchPastEvent,
  fetchUpcommingEvent,
} from "../helper/FetchEvent";
import  { SearchOutlined } from '@ant-design/icons';
import {Button, Input, Tabs } from "antd";
import { List} from "antd";
import CustomCard from "../components/CustomCard";
import {toast}  from 'react-hot-toast'

const getFilterList=(data,filterText)=>
{
 
  filterText=filterText.trim()
  let filteredData=data.filter((item)=>
  {
      if(filterText=='')
      {
         
          return true
      }
      else if(item.title.toLowerCase().includes(filterText.toLowerCase())||item.city.toLowerCase().includes(filterText.toLowerCase())||item.college.toLowerCase().includes(filterText.toLowerCase())||item.description.toLowerCase().includes(filterText.toLowerCase()))
      {
          return true
      }
      return false
  })

  return filteredData
     
}
const Home = () => {
  const [liveEventList, setLiveEventList] = useState([]);
  const [pastEventList, setPastEventList] = useState([]);
  const [upcommingEventList, setUpcommingEventList] = useState([]);
  const [filteredLiveEventList, setFilteredLiveEventList] = useState([]);
  const [filteredPastEventList, setFilteredPastEventList] = useState([]);
  const [filteredUpcommingEventList, setFilteredUpcommingEventList] = useState([]);

  const [filterText,ApplyFilter]=useState('')
  const filterRef=useRef()

  const cityHandler=(e)=>
  {
      e.preventDefault()
      ApplyFilter(filterRef.current.input.value)
  }

  useEffect(() => {

    fetchLiveEvent().then((data) => {
      if(!data.status)
      {
          toast.error('Something got wrong!')
      }
      setLiveEventList(data.items);
      setFilteredLiveEventList(data.items)
    });
    fetchPastEvent().then((data) => {
      if(!data.status)
      {
          toast.error('Something got wrong!')
      }
      setPastEventList(data.items);
      setFilteredPastEventList(data.items)
    });
    fetchUpcommingEvent().then((data) => {
      if(!data.status)
      {
          toast.error('Something got wrong!')
      }
      setUpcommingEventList(data.items);
      setFilteredUpcommingEventList(data.items)
    });
  }, []);



  useEffect(()=>
  {
     
     setFilteredLiveEventList(getFilterList(liveEventList,filterText))
     setFilteredPastEventList(getFilterList(pastEventList,filterText))
     setFilteredUpcommingEventList(getFilterList(upcommingEventList,filterText))
  },[filterText])
 


  const searchBox=<Input.Search  ref={filterRef}  placeholder="input search text"  onChange={cityHandler}  enterButton={<Button style={{backgroundColor:"#db3236"} }><SearchOutlined/></Button>} />


  const onChange = (key) => {
    
  };
  return (
    <div className="home-page">
      <Tabs  tabBarExtraContent={searchBox} size="large" onChange={onChange} type="card">
        <Tabs.TabPane key="1" tab="Upcomming Events">
          
          <List
            grid={{ gutter: 16, column: 4, xs: 1, sm: 2, md: 3 }}
            dataSource={filteredUpcommingEventList}
            renderItem={(item) => (
              <List.Item>
              <CustomCard item={item}/>
              </List.Item>
            )}
          />
          
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Live Events">
          
          <List
            grid={{ gutter: 16, column: 4, xs: 1, sm: 2, md: 3 }}
            dataSource={filteredLiveEventList}
            renderItem={(item) => (
              <List.Item>
               <CustomCard  item={item}/>
              </List.Item>
            )}
          />
          
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="Archived">
          <List
            grid={{ gutter: 16, column: 4, xs: 1, sm: 2, md: 3 }}
            dataSource={filteredPastEventList}
            renderItem={(item) => (
              <List.Item>
                <CustomCard item={item}/>
              </List.Item>
            )}
          />
      
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Home;
