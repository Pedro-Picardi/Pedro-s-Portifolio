import React from 'react'
const NavBar = () => {
  return (
    <div className='absolute top-0 left-0 right-0 mx-auto w-full max-w-[1280px] h-16 bg-transparent backdrop-blur-sm z-50 flex items-center justify-between'>
        <div className='flex items-center justify-center'>
            <p className='text-sm font-medium text-highlight'>Pedro&apos;s Portifolio</p>
        </div>
        <div className='bg-highlight/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center justify-center'>
            <p className='text-sm font-medium text-highlight'>Available for new projects</p>
        </div>
        <div className='flex items-center justify-center'>
            <p className='text-sm font-medium text-highlight'>Press B to book a call</p>
        </div>
    </div>
  )
}

export default NavBar