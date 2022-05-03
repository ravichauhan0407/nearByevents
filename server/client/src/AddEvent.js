import {React,useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import { isAuthenticated } from './auth';



const AddEvent = () => {

  
 const navigate = useNavigate();

 var formData = new FormData(); 

    const [formInputValidity,setFormInputValidity]=useState({
          title:true,
          description:true,
          college:true,
          city:true,
          image:true
    })
    const {title,description,college,city,image}=formInputValidity

    const titleInputRef=useRef();
    const descriptionInputRef=useRef();
    const collegeInputRef=useRef();
    const cityInputRef=useRef();
    const imageInputRef=useRef();

    const  fieldRequired=()=>
    {
            return (<div style={{ color: "red" }}>This field is required</div>)
    }


    const isValid=(str)=>
    {
          return str.length>0
    }
    const sendEvent=(form,token,id)=>
    {
        

      return fetch(`/add-Event/${id}`,{
        method:'POST',
        headers:
        { 
             
               authorization:`Bearer ${token}`
        },
        body:form

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

    const submitHandler=(e)=>
    {
        e.preventDefault();
    
          const isTitleValid=isValid(titleInputRef.current.value)

          const  isDescriptionValid=isValid(descriptionInputRef.current.value)

          const isCollegeValid=isValid(collegeInputRef.current.value)
          
          const iscityValid=isValid(cityInputRef.current.value)
           let isImageValid;

          if(imageInputRef.current.files[0])
          {
              isImageValid=true
          }

          if(isCollegeValid&&isDescriptionValid&&isTitleValid&&isImageValid&&iscityValid)
          {
                 
                 formData.append('title',titleInputRef.current.value)
                 formData.append('image',imageInputRef.current.files[0])
                 formData.append('description',descriptionInputRef.current.value)

                 formData.append('college',collegeInputRef.current.value)

                 formData.append('city',cityInputRef.current.value)

                 formData.append('startTime',startTime.getTime())

                 formData.append('endTime',endTime.getTime())

                

                 var data=isAuthenticated()
               
                 sendEvent(formData,data.token,data.user._id)
                 .then((data)=>
                 {
                     navigate('/')
                 })
                 .catch((err)=>
                 {
                    console.log(err)
                 })
                  
               

                
                  
                 
          }

          setFormInputValidity({
             title:isTitleValid,
             college:isCollegeValid,
             city:iscityValid,
             image:isImageValid,
             description:isDescriptionValid
          })
      


    }






      


  
 const [startTime, startTimeChange] = useState(new Date());
 const [endTime, endTimeChange] = useState(new Date());





   

  return (     
      <div style={{height:"100vh",backgroundColor:"#a9a9a9"}}>
      <form  style={{ width: "100%", minHeight: "100%",padding:25}}>
      <div className="container ">
  <div className="row">
    <div className="col">
    <div className='form-group mb-3'>
            <label className='font-weight-bold' >Title</label>
            <input  type='text' className='form-control' ref={titleInputRef} ></input>
            {!title&&fieldRequired()}
        </div>
    </div>
    <div className="col">
    <div className='form-group mb-3'>
            <label className='font-weight-bold'>Image</label>
            <input className='form-control' type='file' ref={imageInputRef} accept='image/*'></input>
            {!image&&fieldRequired()}
        </div> 
    </div>
    </div>
    <div className="row">
    <div className='col'>
    <div className='form-group mb-3'>
            <label className='font-weight-bold'>Desciption</label>
            <textarea className='form-control'  rows={6} ref={descriptionInputRef}></textarea>
            {!description&&fieldRequired()}
      </div> 
      </div>
     </div>
     <div className='row'>
    <div className="col">
    <div className='form-group mb-3'>
    <label className='font-weight-bold'>Start Time :-</label>
    <DateTimePicker  onChange={startTimeChange} disableClock={true} value={startTime} required={true} />
        </div>
    </div>
    <div className="col">
    <div className='form-group mb-3 ml-3'>
      <label className='font-weight-bold'>End Time :-</label>
      <DateTimePicker onChange={endTimeChange} disableClock={true} value={endTime}  required={true} />  
      </div> 
    </div>
    </div>
    <div className='row'>
    <div className="col">
    <div className='form-group mb-3'>
            <label className='font-weight-bold'>City</label>
            <input  type='text' className='form-control' ref={cityInputRef} ></input>
            {!city&&fieldRequired()}
        </div>
    </div>
    <div className="col">
    <div className='form-group mb-3'>
            <label className='font-weight-bold'>College</label>
            <input className='form-control' type='text' ref={collegeInputRef}></input>
            {!college&&fieldRequired()}
        </div> 
    </div>
    </div>
    <div className="d-flex justify-content-center">
  <button type="submit" className="btn btn-dark" onClick={submitHandler} style={{width:"100px"}}>Add</button>
  </div>
  </div>
    </form>
    </div>
  );
   
}

export default AddEvent