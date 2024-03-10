import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './Usercontext'
export default function Header() {
  const{User} = useContext(UserContext);
  return (
    <div >
        <header className=' flex justify-between'>
        <Link to={'/'} className='flex items-center gap-1' >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-10 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <span className='font-bold text-l'>airbnb</span>
        </Link>
        <div className='flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-350'>
          <div>Anywhere</div>
          <div className='border-l border-red-700'></div>
          <div>Anyweek</div>
          <div className='border-l border-gray-700'></div>
          <div>Add guests</div>
          <button className='bg-primary text-white rounded-full p-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          </button>
        </div>
        <Link to={User?'/account':'/login'} className='flex gap-2 items-center border border-gray-300 rounded-full py-1 px-4 shadow-md shadow-gray-350'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <div className='bg-gray-500 rounded-full text-white overflow-hidden border border-gray-500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative top-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
             </div>
             {!!User && (
              <div>
                {User.name}
              </div>
             )}
        </Link>
        </header>
      </div>
  )
}
