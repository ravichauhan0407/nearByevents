import {React,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import './index.css'
import { Button,Input} from 'antd';
import {toast}  from 'react-hot-toast'
const { TextArea } = Input;

const AddEvent = () => {

  
 const navigate = useNavigate();

 var formData = new FormData(); 

  
    const titleInputRef=useRef();
    const descriptionInputRef=useRef();
    const collegeInputRef=useRef();
    const cityInputRef=useRef();
    const imageInputRef=useRef();
    const startTimeRef=useRef()
    const endTimeRef=useRef()

    const isValid=(str)=>
    {
          return str.length>0
    }

    const sendEvent=(form,token,id)=>
    {
        

      return fetch(`/api/add-Event/${id}`,{
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
       return {status:false}
    })
    }

    const submitHandler=(e)=>
    {
        e.preventDefault();
    
          const isTitleValid=isValid(titleInputRef.current.input.value)
          const  isDescriptionValid=isValid(descriptionInputRef.current.resizableTextArea.textArea.value)

          const isCollegeValid=isValid(collegeInputRef.current.input.value)
          
          const iscityValid=isValid(cityInputRef.current.input.value)
          let isImageValid;

          if(imageInputRef.current.input.files[0])
          {
              isImageValid=true
          }

          if(isCollegeValid&&isDescriptionValid&&isTitleValid&&isImageValid&&iscityValid)
          {
                 
                 formData.append('title',titleInputRef.current.input.value)
                 formData.append('image',imageInputRef.current.input.files[0])
                 formData.append('description',descriptionInputRef.current.resizableTextArea.textArea.value)

                 formData.append('college',collegeInputRef.current.input.value)

                 formData.append('city',cityInputRef.current.input.value)

           

                 formData.append('startTime',Math.floor((new Date(startTimeRef.current.input.value)).getTime()).toString())

                 formData.append('endTime',Math.floor((new Date(endTimeRef.current.input.value)).getTime()).toString())

                

                 var data=isAuthenticated()
               
                 sendEvent(formData,data.token,data.user._id)
                 .then((data)=>
                 {
                    
                     if(data.status)
                     {
                         navigate('/')
                     }
                     else
                     {
                        toast.error('Something got wrong!')
                     }
                 })
                 .catch((err)=>
                 {
                    console.log(err)
                 })
                  
               

                
                  
                 
          }

       
      


    }






      


  



   

  return (     
    <div className='addevent'>
      <div className='custom-title'><h1>Fill Details</h1></div>
    <div className='first'>
  <div className='second'>
  <form onSubmit={submitHandler}>  
<div class="grid">
  <div class="item1"><div>Title:</div><Input required={true} ref={titleInputRef}  /></div>
  <div class="item2"><div>College:</div><Input required={true} ref={collegeInputRef} /></div>
  <div class="item3"><div>City:</div><Input required={true} ref={cityInputRef}  /></div>
  <div class="item4"><div>Cover Image:</div><Input required={true} type="file" name="image" ref={imageInputRef}  /></div>
  <div class="item4"><div>Start Time:</div><Input required={true} type="datetime-local" ref={startTimeRef}  /></div>
  <div class="item4"><div>End Time:</div><Input required={true} type="datetime-local" ref={endTimeRef}  /></div>
  <div class="box"><div>Description:</div><TextArea required={true} ref={descriptionInputRef} style={{
        height: 200,
        resize: 'none',
      }}    maxLength={100} /></div>
</div>
<div className='custom-btn'><Button  style={{width:'30%',height:'30px',backgroundColor:'#db3236'}} htmlType="submit">
          Submit
        </Button></div>
</form>
  </div>

</div>
</div>
  );
   
}

export default AddEvent