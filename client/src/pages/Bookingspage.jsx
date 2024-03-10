import React, {useState, useEffect } from 'react'
import Accountnav from '../Accountnav';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import BookingDates from '../BookingDates';
export default function Bookingspage() {
  // const {id} =useParams();
  const[bookings,setBookings] = useState([]);

  // useEffect(() => {
  //   if (id) {
  //     axios.get('/bookings', {}).then(response => {
  //       const foundBooking = response.data.find(({_id}) => _id == id);
  //       if(foundBooking){
  //         setBookings([foundBooking]);
  //       }
  //     });
  //   }
  // }, [id]);
  // if(!bookings.length){
  //   return null;
  // }

  useEffect(()=>{
    axios.get('/bookings').then(response =>{
      setBookings(response.data);
    });
  },[])
  console.log(bookings)
  return (
    <div>
      <Accountnav />
      <div>
        { bookings.map(booking =>(
          <Link to={`${booking._id}`} className='flex gap-2 p-6 mb-2 border rounded-2xl bg-gray-200' key={booking._id}>
            <div className='w-40'>
              <PlaceImg  className={'rounded-full'} place={booking.place}/>
            </div>
            <div className='py-3 pr-3 grow'>
              <h2>{booking.place.title}</h2>
              <div>

               <BookingDates booking={booking}  className='mb-2 mt-4 text-gray-500' />
                <div className='flex gap-1 mt-2 '>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  <span className='text=2xl'>
                    Total price :${booking.Price};
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
