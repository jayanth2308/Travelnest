import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export default function Indexpage() {
 
  const [places,setPlaces] = useState([]);
  
  useEffect(() =>{
   
    axios.get('/places').then(response =>{
      setPlaces([...response.data,...response.data,...response.data]);
      // console.log([places.photos]);
    });
  },[])
  return (
    <>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mt-8 rounded-full'>
      {places.length >0 && places.map(place => (
        <Link to={'/place/'+place._id}>
          <div className='bg-gray-500 mb-2 rounded-2xl flex '>
            {place.photos?.[0] && (
              <img src={'http://localhost:4048'+ place.photos?.[0]} className='rounded-2xl object-cover aspect-square' />
            )}
          </div> 
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.Price}</span> per night
          </div>
        </Link>
      )) }
    </div>
    </>
  )
}
