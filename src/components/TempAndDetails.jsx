import React from 'react'

const TempAndDetails = ({weather:{
    details,
    icon,
    temp
}}) => {

  return (
    <div>
        <div className='flex items-center justify-center py-5 text-xl text-slate-300'>
            <p>{details}</p>
        </div>

        <div className='flex flex-row items-center justify-around '>
            <img
                src={icon} alt='weather icon' className='w-20'
            />
            <p className='text-4xl text-slate-100'>{temp.toFixed()}°</p>
        </div>
    </div>
  )
}

export default TempAndDetails