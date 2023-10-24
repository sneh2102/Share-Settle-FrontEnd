import React from 'react'
import { useUserAuth } from '../../Context/AuthContext';

export default function Dashboard() {
  const {user, Logout} =useUserAuth();
  console.log(user);
  const handleLogOut = async () =>{
    try {
        await Logout();
    }
    catch(err)
    {
      console.log(err.messege);
    }
  }
  return (
    <div> 
      Welcome to ShareSettle.
      <br/>
      <div>
      {user.mail}
      </div>
  

      <button onClick={handleLogOut}>
        Logout
      </button>
    </div>
  )
}
