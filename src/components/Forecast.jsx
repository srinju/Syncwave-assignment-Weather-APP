import React from 'react'

const Forecast = ({title,data}) => {

  return (
    <div className='px-4 sm:px-6 md:px-8 lg:px-12'>
        <div className='flex items-center justify-start mt-6'>
            <p className='text-slate-100 font-medium uppercase text-base sm:text-lg md:text-xl'>{title}</p>
        </div>
        <hr className='my-1 border-slate-600' />
        <div className='flex  items-center justify-between gap-2'>
            {data.map((d,index) => (
                <div key={index} className='text-slate-100 flex flex-col items-center justify-center w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/7'>
                    <p className='font-light text-xs sm:text-sm md:text-base'>{d.title}</p>
                    <img className='w-10 h-10 sm:w-12 sm:h-12 my-1' src={d.icon} alt='asdasd'/>
                    <p className='font-medium text-sm sm:text-base md:text-lg'>{d.temp.toFixed()}°</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Forecast