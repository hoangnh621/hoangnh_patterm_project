import { createPortal } from 'react-dom'
import styled from 'styled-components'

const StylePortal = styled.div`
  position: absolute;
  top: 0;
`

const Portal = ({ children }) => {
  const container = document.querySelector('body')
  return createPortal(<StylePortal>{children}</StylePortal>, container)
}

export default Portal
