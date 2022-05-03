import React from 'react'
import {BrowserRouter,Route,Routes}  from 'react-router-dom'
import Login from './user/Login'
import Signup from './user/Signup'
import Home from './core/Home'
import  Header from './Header'
import PrivateRoute from './auth/privateroutes'
import AddEvent from './AddEvent'
import Description from './Description'
import Footer from './components/Footer'
import PageNotFound from './components/PageNotFound'
import PastEvents from './Page/PastEvents'
import LiveEvents from './Page/LiveEvents'
import UpcomingEvents from './Page/UpcomingEvents'

export default function App (){
  return (
         <>
         <BrowserRouter>
            <Header/>
            <Routes>
                   <Route path='/' exact  element={<Home/>}></Route>
                   <Route path='/signin' exact element={<Login/>}></Route>
                   <Route path='/signup' exact element={<Signup/>}></Route>
                   <Route path='/addEvent' element={<PrivateRoute><AddEvent/></PrivateRoute>}></Route>
                   <Route path='/description/:id' exact element={<Description/>}></Route>
                   <Route path='events/live-events' exact element={<LiveEvents/>}></Route>
                   <Route path='events/past-events' exact element={<PastEvents/>}></Route>
                   <Route path='events/upcoming-events' exact element={<UpcomingEvents/>}></Route>
                   <Route path="*" element={<PageNotFound/>}></Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
        </>
  )
}


