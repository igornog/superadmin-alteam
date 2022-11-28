import ResizeObserver from 'resize-observer-polyfill'
import { useState, useLayoutEffect } from 'react'
import { useCallbackRef } from './useCallbackRef'

export function useMeasure() {
  const [element, attachRef] = useCallbackRef()
  const [bounds, setBounds] = useState({})

  useLayoutEffect(() => {
    function onResize([entry]: any) {
      setBounds({
        height: entry.contentRect.height,
        width: entry.contentRect.width,
      })
    }

    const observer: any = new ResizeObserver(onResize)

    if (element) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [element])

  return {
    bounds,
    ref: attachRef,
  }
}
