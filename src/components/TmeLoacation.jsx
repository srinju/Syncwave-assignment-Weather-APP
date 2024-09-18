import React from 'react'

const TmeLoacation = ({ weather : {formattedLocalTime , name , country}}) => {
  return (
    <div className='px-4  sm:px-6 md:px-8 lg:px-12'>
        <div className='flex items-center justify-center my-6'>
            <p className='text-slate-100 text-base sm:text-lg md:text-xl lg:text-2xl font-extralight'>
                {formattedLocalTime}
            </p>
        </div>

        <div className='flex items-center justify-center my-3'>
            <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-100 font-medium'>{name} , {country}</p>
        </div>
    </div>
  )
}

export default TmeLoacation