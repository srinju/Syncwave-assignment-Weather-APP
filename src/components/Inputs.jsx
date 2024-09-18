import React, { useState } from 'react'
import { BiSearch , BiCurrentLocation } from 'react-icons/bi';

const Inputs = ({setQuery,setUnits}) => {

    const [city,setCity] = useState('');

    const handleSearchButton = () => {
        if(city !== ''){
            setQuery({ q: city});
        }
    }

  return (
     <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='text-gray-800 text-xl font-light p-2 w-full shadow-xl capitalize rounded-lg focus:outline-none placeholder:lowercase'
                type='text'
                placeholder='Search by City ...' 
            />
            <BiSearch onClick={handleSearchButton} color='white' size={30} className='cursor-pointer transition ease-out hover:scale-125' />
        </div>
  </div>
  )
}


export default Inputs