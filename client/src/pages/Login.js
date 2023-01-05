import React, { useState } from 'react'

import {Navigate} from 'react-router-dom'
import {toast}  from 'react-hot-toast'

const Login = () => {
    
    const [values,setValues]=useState({
      email:'',
      password:'',
      error:'',
      loading:false,
      redirectToHome:false
    });

    



    const handleChange=name=>e=>
    {
         setValues({...values,error:'',[name]:e.target.value})
    }
     
    const signin=(user)=>
    {
        
         return fetch(`/api/signin`,{
             method:'POST',
             headers:
             {
               Accept:'application/json',
               'Content-Type':'application/json'
             },
             body:JSON.stringify(user)
         }).then(res=>
          {
              return res.json().then((data)=>{
                 return data;
              });
          })
         .catch((err)=>
         {
            return {status:false};
         })

    }


    const  isLoading=()=>
    {
      return (
        <div className='alert alert-info mt-3' style={{display:values.loading?'':'none'}}>...Loading</div>
       )
   
    }


    const redirect=()=>
    {
          if(values.redirectToHome)
          {
            return <Navigate to='/'/>
          }
    }


 

    const showError=()=>
    {
      
      
       return (
          <div className='alert alert-danger mt-3' style={{display:values.error?'':'none'}}>{values.error}</div>
       )
     
  
    }
     const handleSubmit=(e)=>
     {
        setValues({...values,error:'',loading:true})

         signin({name:values.name,password:values.password,email:values.email})
        .then((data)=>
        {
            
             if(!data.status)
             {
                toast.error('Email or Password is wrong!')
              
             }
             else 
             {
                if(typeof window!=='undefined')
                {
                  localStorage.setItem('jwt',JSON.stringify(data))
                }
                setValues({success:true,
                email:'',
                password:'',
                loading:false,
                redirectToHome:true
              })
             }
        })
        .catch(err=>
          {
               return {status:false}
          })
        e.preventDefault();
     }



  return (
    <>
      <div className='container col-sm-6 col-md-4' >
       {redirect()}
        <form style={{padding:25}}>
          <div className='form-group mb-3'>
              <label className='text-muted'>Email</label>
              <input onChange={handleChange('email')} type='email' className='form-control' value={values.email}></input>
          </div> 
          <div className='form-group mb-3'>
              <label className='text-muted'>Password</label>
              <input onChange={handleChange('password')}  type='password' className='form-control' value={values.password}></input>
          </div>
          <div className="container">
        <div className="col-md-12 text-center">
            <button  onClick={handleSubmit} type="button" className="btn w-50 submit-btn">Submit</button>
        </div>
    </div>
      </form>
      </div>
      </>
  )
}

export default Login
