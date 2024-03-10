import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Accountnav from '../Accountnav';
import axios from 'axios';
import Perks from '../Perks';

export default function PlacesFormpage() {

  const{id} = useParams(); 
  const[title,setTitle] = useState('');
  const[address,setAddress] = useState('');
  const[photoLink ,setPhotoLink] = useState('');
  const[addedPhotos,setAddedPhotos] = useState([]);
  const[description,setDescription] = useState('');
  const[perks,setPerks] = useState([]);
  const[extraInfo,setExtraInfo] = useState('');
  const[checkIn,setCheckIn]=useState('');
  const[checkOut,setCheckOut]=useState('');
  const[maxGuests,setMaxGuests]=useState(1);
  const[Price,setPrice]= useState(100);
  const[redirect,setRedirect] = useState(false);

  useEffect (() =>{
    if(!id){
      return;
    }
    axios.get('/places/'+id).then(response =>{
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.Price);
    })
  },[id])

  function inputHeader(text){
    return(
      <h2 className='text-2xl mt-4'>{text}</h2>
    )
  }

  function inputDescription(text){
    return(
      <p className='text-gray-500 text-sm'>{text}</p>
    )
  }


  function preInput(header,description){
    return(
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  async function addPhotoByLink(ev){
    ev.preventDefault();
    const {data : filename} =await axios.post('upload-by-link',{link : photoLink});
    setAddedPhotos(prev => {
      return [...prev,filename];
    })
    setPhotoLink('');
  }

  function uploadPhoto(ev){
    const files=ev.target.files;
    console.log(files);
    const data = new FormData();

    for(let i=0 ;i<files.length;i++){
      data.append('photos',files[i]);
    }
    
     axios.post('/upload',data,{
      headers:{'Content-Type':'multipart/form-data'}
     }).then(response =>{
      const {data:filenames} = response;
      setAddedPhotos(prev =>{
        return [...prev,...filenames];
      })
     })

  }
   
  function removePhoto(ev, filename) {
    ev.preventDefault();
    setAddedPhotos(prevPhotos => {
      const updatedPhotos = prevPhotos.filter(photo => photo !== filename);
      console.log(updatedPhotos);
      return updatedPhotos;
    });
  }
  

  function mainPhoto(ev,filename){
    ev.preventDefault();
    const addedPhotoswithoutSelect = addedPhotos.filter(photo => photo !== filename);
    const newAddedPhotos = [filename,...addedPhotoswithoutSelect];
    setAddedPhotos(newAddedPhotos);
  }

  async function savePlace(ev){
    ev.preventDefault();
    console.log(title,address,addedPhotos,description,extraInfo,
      perks,checkIn,checkOut,maxGuests,Price);
    const placeData={
      title,address,addedPhotos,description,extraInfo,
      perks,checkIn,checkOut,maxGuests,Price,
    };
    
    if(id){
      await axios.put('/places',{id,...placeData});
      setRedirect(true);
    }else{
      await axios.post('/places',placeData);
      setRedirect(true);
    }
  }

  if(redirect){
    return <Navigate to={'/account/places'} />
  }
  return (
    <div>
      <Accountnav />
      <form className='mx-20 mt-10' onSubmit={savePlace}>
        {preInput('Title','Title of your place should be short and catchy to the customers')}
        <input type='text' value={title} onChange={ev =>setTitle(ev.target.value) } placeholder = 'title' />
        {preInput('Address','Address to this place')}
        <input type='text' value={address} onChange={ev =>setAddress(ev.target.value) } placeholder = 'address' />
        {/* //addedPhotos */}
        {preInput('Photos','more photos more people')}
        <div className='flex gap-2'>
          <input type='text' value={photoLink} onChange={ev =>setPhotoLink(ev.target.value)} placeholder='add photo by link' />
          <button onClick={addPhotoByLink} className='rounded-full px-2 text-white'>Add&nbsp;Photo</button>
        </div>
        <div className='mt-2  gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
          {addedPhotos.length >0 && addedPhotos.map(link =>(
            <div className='h-32 flex relative rounded-2xl'>
              <img className='rounded-2xl h-full w-full object-cover' src={`http://localhost:4048${link}`} />
              <button onClick={(ev)=> removePhoto(ev,link) } className='absolute bottom-1 right-1 text-white bg-black cursor-pointer py-1 px-2 bg-opacity-30 rounded-2xl'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
              <button onClick={(ev)=> mainPhoto(ev,link) } className='absolute bottom-1 left-1 text-white bg-black cursor-pointer py-1 px-2 bg-opacity-30 rounded-2xl'>
                {link == addedPhotos[0] && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                  </svg>
                )}
                {link !== addedPhotos[0] && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                ) }
              </button>
            </div>
          ))}
          <label className='flex cursor-pointer  border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 h-32 items-center justify-center'>
            <input type='file' multiple className='hidden' onChange={uploadPhoto} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
            </svg>
            Upload
          </label>
        </div>
        {preInput('Description','description of the place')}
        <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>
        {/* //perks */}
        {preInput('perks',"available perks")}
        <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('ExtraInfo','house rule etc')}
        <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
        <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
          <div>
            <h3 className=''>Check in Time</h3>
            <input type='text' value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
          </div>
          <div>
            <h3 className=''>Check Out Time</h3>
            <input type='text' value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
          </div>
          <div>
            <h3 className=''>maxGuests</h3>
            <input type='number' value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}/>
          </div>
          <div>
            <h3 className=''>Price</h3>
            <input type='number' value={Price} onChange={ev => setPrice(ev.target.value)}/>
          </div>
        </div>
        <button className='w-full py-2 rounded-full bg-primary text-white'>Save Place</button>
      </form>

    </div>
  )
}
