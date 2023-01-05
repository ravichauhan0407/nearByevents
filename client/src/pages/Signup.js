import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"



const Signup = () => {
    const navigate=useNavigate()
    const [values,setValues]=useState({
      name:'',
      email:'',
      password:'',
      error:'',
      success:false
    });




    const handleChange=name=>e=>
    {
         setValues({...values,error:'',[name]:e.target.value})
    }
     
    const signup=(user)=>
    {
       
         return fetch(`/api/signup`,{
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
            return err;
         })

    }
    const showSuccess=()=>
    {
      return (
        <div className='alert alert-info mt-3' style={{display:values.success?'':'none'}}>You have successfully registered</div>
     )
    }

    const showError=()=>
    {
       return (
          <div className='alert alert-danger mt-3' style={{display:values.error?'':'none'}}>{values.error}</div>
       )
    }
     const handleSubmit=(e)=>
     {
        setValues({...values,error:''})

        signup({name:values.name,password:values.password,email:values.email})
        .then((data)=>
        {
          console.log(data.errors)
             if(data.errors)
             {
                   setValues({...values,error:data.errors[0].msg,success:false})
                  
             }
             else
             {
                navigate('/signin')
             }
        })
        e.preventDefault();
     }



  return (
    <>
     
      <div className='container col-sm-6 col-md-4' >
       {showSuccess()}
       {showError()}
        <form style={{padding:25}}>
        <div className='form-group mb-3'>
              <label className='text-muted'>Name</label>
              <input onChange={handleChange('name')} type='text' className='form-control' value={values.name}></input>
          </div>
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

export default Signup
