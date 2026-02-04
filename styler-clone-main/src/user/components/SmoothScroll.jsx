import { ReactLenis } from 'lenis/react'
import { Fragment, useEffect, useRef } from 'react'

function SmoothScrollWrapper({ children, root = true, style = { height: '100vh', overflowY: 'auto' } }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    function raf(time) {
      lenisRef.current?.lenis?.raf(time)
    }
    const rafId = requestAnimationFrame(raf)
    return () => rafId && cancelAnimationFrame(rafId)
  }, [])
  return (
    <Fragment>
      <ReactLenis 
        root={root}
        style={style}
      >
        {children}
      </ReactLenis>
    </Fragment>
  )
}

export default SmoothScrollWrapper;