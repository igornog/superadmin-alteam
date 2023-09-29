import { useEffect, useState } from 'react'

const getSize = () => {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  }
}

const useWindowSize = () => {
  const [windowSize, setWindowsSize] = useState(getSize())

  const handleResize = () => {
    setWindowsSize(getSize())
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

export default useWindowSize
