import {React, useEffect, useState} from 'react'
import axios from 'axios'
import { useAuth } from '../../App';

const User = () => {
  const [userData, setUserData] = useState(null);
   const {userEmail}= useAuth();

   useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response= await axios.get("http://localhost:3000/api/auth/profile",{
          params:{email: userEmail},
        });
        console.log(response.data)
        setUserData(response.data);
      }
      catch(error){
        console.error("Error fetching user details:", error);
      }
      if(userEmail){
        fetchData();
      }
    }
   },[userEmail]);

   useEffect(()=>{
    console.log(userEmail);
    console.log(userData);
   },[userEmail,userData]);

  
  return (
    <div>
      <div className='text-white'>
        {userData ? (
          <div>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Email: {userData.email}</p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  )
}

export default User
