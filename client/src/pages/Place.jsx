import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Placegallery from '../Placegallery';
import Bookinwidget from '../Bookinwidget';
export default function Place() {
  const {id} = useParams();
 const [place,setPlace] = useState(null);
//  const[showAllPhotos,setShowAllPhotos] = useState(false)
  useEffect(()=>{
    if(!id){
      return;
    }
    axios.get(`/places/${id}`).then(response =>{
      setPlace(response.data);
    })
  },[id]);

  if(!place) return '';

 

  return (
    <div className='mt-4 mx-4 bg-gray-100  px-8 py-8 rounded-2xl'>
      <h1 className=' p-2 text-2xl'>{place.title}</h1>
      <a target='_blank' href={'https://maps.google.com/?q=' +place.address} className='flex gap-1 item-center block font-bold underline'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
      </svg>
        {place.address} 
      </a>
      <Placegallery place={place} />
      <div className= 'grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div>
          <div className='my-2'>
            <h2 className='font-semibold text-2xl'>Description</h2>
            {place.description}
          </div>
          Check-in:{place.checkIn} <br/>
          Check-out:{place.checkOut} <br/>
          Max number of Guests : {place.maxGuests}
        </div>
        <Bookinwidget place={place}/>
      </div>
      <div className='py-2'>
        <h2 className='font-semibold text-xl'>ExtraInfo</h2>
        <div className=' py-1 text-sm text-gray-500'>
          {place.extraInfo}
        </div>
      </div>
    </div>
  )
}
