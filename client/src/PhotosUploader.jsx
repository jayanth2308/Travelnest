import React, { useState } from 'react'
import axios from 'axios'
export default function PhotosUploader() {

    const[photoLink ,setPhotoLink] = useState('');
    
    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename}=await axios.post('/upload-by-link',{link : photoLink});
        onchange(prev =>{
            return[...prev,filename];
        })
    }

  return (
    <div className='flex gap-2'>
        <input value={photoLink} type='text' placeholder='place ypur image link' onChange={ev =>setPhotoLink(ev.target.value)}/>
        <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
    </div>
  )
}
