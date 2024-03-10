import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import { UserContext } from './Usercontext';
import axios from 'axios';


export default function Bookinwidget({place}) {

    const[checkIn,setCheckIn] = useState('')
    const[checkOut,setCheckOut] = useState('')
    const[maxGuests,setMaxGuests] = useState(1)
    const[name,setName] = useState('');
    const[phone,setPhone] = useState('');
    const[redirect,setRedirect] = useState('');
    const {User} = useContext(UserContext);

    useEffect(() =>{
        if(User){
            setName(User.name)
        }
    },[User]);

    console.log(checkIn);
    let numofnights =0;
    if(checkIn && checkOut){
       numofnights =  differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookPlace(){
        const price = numofnights * place.Price;
        const response= await axios.post('/bookings',{
            checkIn,checkOut,maxGuests,sname:name,phone,
            place:place._id,
            Price:price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }
     
    if(redirect){
       return <Navigate to={redirect} />
    }
    console.log(place);
  return (
    <div>
          <div className='bg-white shadow p-1 rounded-2xl'>
              <div className='text-xl text-center'>
                Price:${place.Price} / per night
              </div>
              <div className='border rounded-2xl mb-1'>
                <div className='flex'>
                  <div className='py-2 px-8  '>
                    <label>Check in:</label>
                    <input type='date' value={checkIn} onChange={(ev)=>setCheckIn(ev.target.value)} />
                  </div>
                  <div  className='py-2 px-4 mr-3 border-l'>
                    <label>Check out:</label>
                    <input type='date' value={checkOut} onChange={(ev)=>setCheckOut(ev.target.value)} />
                  </div>
                </div>
                <div className='py-2  text-center border-t'>
                  <label>Number of Guests:</label>
                  <input type='number'value={maxGuests} onChange={(ev)=>setMaxGuests(ev.target.value)} />
                </div>
                {
                    numofnights>0  && (
                    <>
                        <div className='py-2'>
                            <label className='px-4 py-2'>your Name</label>
                            <input type='text' value={name} onChange={ev => setName(ev.target.value)} />
                        </div>
                        <div className='py-2'>
                            <label className='px-4 py-2'>Mobile no</label>
                            <input type='tel' value={phone} onChange={ev => setPhone(ev.target.value)} />
                        </div>  
                    </> 
                )
              }
              </div>
              <button className='bg-primary text-white w-full rounded-full py-2' onClick={bookPlace}>
                Book this place 
                {
                    numofnights>0 && (
                        <span className='px-2'>${numofnights * place.Price}</span>
                    )
                }
            </button>
              
          </div>
        </div> 
  )
}
