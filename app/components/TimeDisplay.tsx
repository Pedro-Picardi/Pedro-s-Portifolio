'use client'

import React, { useState, useEffect } from 'react'

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <p className="text-sm font-medium font-silkamono text-highlight tracking-[-1px]">
      {time.toLocaleTimeString()}
    </p>
  )
}

export default TimeDisplay 