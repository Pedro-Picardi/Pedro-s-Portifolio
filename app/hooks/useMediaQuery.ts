'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook for media queries
 * @param query The media query to check
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    
    // Set the initial value
    setMatches(mediaQuery.matches)
    
    // Create a handler for changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    // Add the listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
    } else {
      // For older browsers
      mediaQuery.addListener(handler)
    }
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler)
      } else {
        // For older browsers
        mediaQuery.removeListener(handler)
      }
    }
  }, [query])
  
  return matches
} 