import React from 'react'
import TimeDisplay from './TimeDisplay'

const NavBar = () => {
  return (
    <div className='absolute top-0 left-0 right-0 mx-auto w-full max-w-[1280px] h-16 bg-transparent backdrop-blur-sm z-50 flex items-center justify-between'>
        <div className='flex items-center justify-center'>
            <TimeDisplay />
        </div>
        <div className='bg-grey/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center justify-center'>
            <span className='w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_5px_#22c55e] animate-pulse'></span>
            <p className='text-sm font-medium text-align-center font-silkamono text-highlight tracking-[-1px]'>Available for new projects</p>
        </div>
        <div className='flex items-center justify-center'>
            <p className='text-sm font-medium font-silkamono text-highlight tracking-[-1px]'>Press <span className='text-accent font-bold bg-grey/60 backdrop-blur-md rounded-md px-2 py-1 border border-grey/60 shadow-[0_2px_5px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)] transition-all duration-200 ease-in-out transform hover:translate-y-0.5 hover:shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] hover:bg-grey/60 hover:border-grey/70'>B</span> to book a call</p>
        </div>
    </div>
  )
}

export default NavBar