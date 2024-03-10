import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function Registerpage() {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[name,setName] = useState('');
    

    async function handleSumbit(ev){
      ev.preventDefault();
      try{
        await axios.post('/register',{
          name,
          email,
          password,
        });
        alert('registration successful')
      }catch(e){
        alert('registration failed try again')
      }
      
    }
  return (
    
        <div className='p-4 grow flex flex-col items-center justify-center  '>
          <h1 className='text-2xl text-center my-4'>Register</h1>
          <form className='max-w-md mx-auto' onSubmit={handleSumbit}>
            <input type='text' placeholder="name" value={name} onChange={ev=>setName(ev.target.value)}/>
            <input type='email' placeholder="your@email.com" value={email} onChange={ev=>setEmail(ev.target.value)}/>
            <input type='password' placeholder="password" value={password} onChange={ev=>setPassword(ev.target.value)}/>
            <button className='primary'>Register</button>
            <div className='text-center p-2 text-l'>Already have an account?<Link to={'/login'}className='underline text'>Login</Link></div>
          </form>
       </div>
    
  )
}
