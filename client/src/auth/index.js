



export const signout=()=>
{
      
      
               if(typeof window!=='undefined')
                {
                  localStorage.removeItem('jwt')
                  return fetch(`api/signout`,{
                   method:'GET',
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
}


export const isAuthenticated=()=>
{
       if(typeof window!=='undefined')
       {
              if(localStorage.getItem('jwt'))
              {
                    return JSON.parse(localStorage.getItem('jwt'))
              }
              return false
       }
    return false;
}
