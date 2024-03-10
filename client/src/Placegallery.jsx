import React from 'react'
import { useState } from 'react';

export default function Placegallery({place}) {
    const[showAllPhotos,setShowAllPhotos] = useState(false)

    if(showAllPhotos){
        return(
          <div className='absolute inset-0 bg-black text-white min-h-screen'>
            <div className='bg-black p-8 grid gap-4'>
            <div>
            <h2 className='text-2xl mr-48'>Photos of {place.title} </h2>
              <button onClick={()=>setShowAllPhotos(false)} className='right-12 top-8 fixed flex gap-1 py-1 px-4 rounded-2xl text-white shadow-gray'>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                Close photo
              </button>
            </div>
            {place?.photos?.length> 0 && place.photos.map(photo => (
              <div className='p-2 grid gap-2'>
                <img src={'http://localhost:4048' +photo} alt=''/>
              </div>
            )) }
            </div>
          </div>
        )
      }

  return (
    <div className='relative '>
        <div className='grid grid-cols-[2fr_1fr] gap-2  mt-8 mb-8 rounded-2xl lg:h-screen/2'>
          <div className="aspect-w-16 aspect-h-9">
            {place.photos?.[0] && (
                <div className="w-full h-full relative">
                <img className='absolute inset-0 w-full h-full object-cover cursor-pointer ' onClick={()=>setShowAllPhotos(true)} src={'http://localhost:4048'+ place.photos[0] } />
                </div>
            )}
          </div>
            <div className='grid'>
                {place.photos?.[1] && (
                    <img className='aspect-square object-cover cursor-pointer ' onClick={()=>setShowAllPhotos(true)} src={'http://localhost:4048'+ place.photos[1] } />
                )}
                <div className='overflow-hidden'>
                {place.photos?.[2] && (
                    <img className='aspect-square object-cover relative top-2 cursor-pointer ' onClick={()=>setShowAllPhotos(true)} src={'http://localhost:4048'+ place.photos[2] } />
                )}
               </div>
            </div>
        </div>
        <button className='absolute bg-gray-100 bottom-1 right-1 rounded-full py-0.5 px-2 shadow shadow-md shadow-gray flex text-center gap-1' onClick={() =>setShowAllPhotos(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
            show more
        </button>
  </div>
  )
}
