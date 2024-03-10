import React,{useState,useEffect} from 'react'
import Accountnav from '../Accountnav'
import { Link } from 'react-router-dom'
import axios from 'axios';
import PlaceImg from '../PlaceImg';

export default function Placespage() {

  const [places,setPlaces] = useState('');

  useEffect(() => {
  
    axios.get('/places')
    .then(({data})  =>{
      setPlaces(data);
    })
  }, [])
  return (
    <div>
        <Accountnav />
        <div className='text-center'>
             <Link className=' inline-flex gap-2 text-white justify-center bg-primary py-2 px-6 rounded-full ' to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
                Add place
            </Link>
        </div>
        <div className='mt-4'>
          {places.length >0 && places.map(place => (
            <Link to={'/account/places/'+place._id} className='bg-gray-200 flex cursor-pointer gap-4 rounded-2xl p-4 mt-8'>
              <div className=' flex object-cover w-32 h-32 bg-gray-300  shrink-0'>
                <PlaceImg place={place} />
              </div>
              <div>
               <h2 className='text-xl'>{place.title}</h2>
               <p className='text-sm mt-2'>{place.description}</p> 
              </div>
            </Link>
          ))}
        </div>
    </div>
  )
}
