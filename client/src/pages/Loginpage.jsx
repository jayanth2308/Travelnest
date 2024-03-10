import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, Navigate,} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Usercontext';

export default function Loginpage() {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[redirect,setRedirect] = useState(false);
    const{setUser} = useContext(UserContext);
    async function handleSubmit(ev){
      ev.preventDefault();
        try{
          const response = await axios.post('/login',{
            email,
            password,
          })
          setUser(response.data);
          setRedirect(true);
          alert('Login successfull');
        }catch(e){
          alert('Login failed');
        }
      }

      if(redirect){
        return <Navigate to={'/'}/>
      }

  return (
    <div className='p-4 grow flex flex-col items-center justify-center'>
        <h1 className='text-2xl text-center mb-4'>login</h1>
        <form className='max-w-md mx-auto ' onSubmit={handleSubmit}>
            <input type='email' placeholder="your@email.com" onChange={ev=>setEmail(ev.target.value)}/>
            <input type='password' placeholder="password" onChange={ev=>setPassword(ev.target.value)}/>
            <button className='primary'>Login</button>
            <div className='text-center p-2 text-l'>Don't have an account?<Link to={'/register'}className='underline text'>Register</Link></div>
        </form>
    </div>
  )
}
