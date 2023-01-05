import React from 'react'
import {BrowserRouter,Route,Routes}  from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import  Header from './components/Header'
import {PrivateRoute,ProtectedRoute} from './auth/privateroutes'
import AddEvent from './pages/AddEvent'
import Description from './pages/Description'
import PageNotFound from './pages/PageNotFound'
import  {Toaster} from 'react-hot-toast'

export default function App (){
  return (
         <>
         <Toaster
  position="top-center"
  reverseOrder={false}
/>
         <BrowserRouter>
            <Header/>
            <div className='body'>
            <Routes>
              
                   <Route path='/' exact  element={<Home/>}></Route>
                   <Route path='/signin' exact element={<ProtectedRoute><Login/></ProtectedRoute>}></Route>
                   <Route path='/signup' exact element={<ProtectedRoute><Signup/></ProtectedRoute>}></Route>
                   <Route path='/addEvent' element={<PrivateRoute><AddEvent/></PrivateRoute>}></Route>
                   <Route path='/description/:id' exact element={<Description/>}></Route>
                   <Route path="*" element={<PageNotFound/>}></Route>
            </Routes>
            </div>
        </BrowserRouter>
        </>
  )
}


