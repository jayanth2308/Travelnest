import React, { useContext, useState } from 'react'
import Accountnav from '../Accountnav'
import { UserContext } from '../Usercontext';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Profilepage() {

    const [redirect,setRedirect] = useState(null);
    const {ready,User,setUser} = useContext(UserContext);

    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile';
    }

    // if(!ready){
    //     return '...Loading';
    // }

    if(ready && !Userser && !redirect){
        return <Navigate to={'/login'} />
    }
    if(redirect){
        return <Navigate to={redirect} />
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
      }
  return (
    <div>
        <Accountnav />
        {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
            Logged in as {User && User.name} ({User && User.email})<br />

                <button onClick={logout} className="primary max-w-sm mt-2"> logout</button>
            </div>
        )}
    </div>
  )
}
