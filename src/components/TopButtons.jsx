import React from 'react'

const TopButtons = ({setQuery}) => {

    const cities = [
        {
            id: 1 ,
            title : "London"
        },
        {
            id: 2 ,
            title : "Mumbai"
        },
        {
            id: 3 ,
            title : "Paris"
        },
        {
            id: 4 ,
            title : "Kolkata"
        },
        {
            id: 5 ,
            title : "Tokyo"
        }
    ];

  return (
    <div className='flex flex-wrap items-center justify-around my-6 gap-2'>
        {cities.map(city => (
            <button onClick={() => setQuery({q:city.title})} key={city.id} className='text-lg text-slate-100 font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in'>{city.title}</button>
        ))}
    </div>
  )
}

export default TopButtons