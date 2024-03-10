import React from 'react'

export default function PlaceImg({place,index=0,className=null}) {
    console.log(place.photos);
    if(!place.photos?.length){
        return '';
    }
    if(className){
        className += 'object-cover';
    }
  return (
    <img className={className} src={'http://localhost:4048'+place.photos[index]} alt=''  />
  )
}
