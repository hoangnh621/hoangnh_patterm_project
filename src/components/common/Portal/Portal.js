import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const StylePortal = styled.div`
  position: fixed;
  inset: 0;
`

const Portal = ({ children }) => {
  const container = document.querySelector('body')
  return createPortal(
    <StylePortal id="portal">{children}</StylePortal>,
    container,
  )
}

Portal.propTypes = {
  children: PropTypes.object.isRequired,
}

export default Portal
