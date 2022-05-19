import { useEffect } from 'react'

const useOutsideClick = (ref, handleClickOutside) => {
  const portal = document.getElementById('portal')
  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current.contains(e.target)) {
        handleClickOutside()
      }
    }
    portal?.addEventListener('click', handleClick)
    return () => portal?.removeEventListener('click', handleClick)
  }, [handleClickOutside, portal, ref])
}

export default useOutsideClick
