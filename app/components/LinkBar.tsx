import React from 'react'

const LinkBar = () => {
  return (
    <div className='absolute bottom-4 left-0 right-0 mx-auto w-[800px] h-16 bg-grey border border-highlight/20 rounded-full backdrop-blur-sm z-50 flex items-center justify-center'>
        <div className='flex items-center justify-center'>
            <p className='text-sm font-medium text-highlight'>Pedro&apos;s Portifolio</p>
        </div>
    </div>
  )
}

export default LinkBar