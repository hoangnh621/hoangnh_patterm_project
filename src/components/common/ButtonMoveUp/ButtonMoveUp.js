import PropTypes from 'prop-types'
import { useEffect } from 'react'
import styled from 'styled-components'
import globalStyles from '../../../styles/globalStyles'
import './icomoonUP/style.css'

const StyledButton = styled.button`
  position: fixed;
  bottom: 3%;
  right: 3%;
  height: 37px;
  width: 37px;
  border-radius: 5px;
  border: none;
  background-color: ${globalStyles.primaryTextColor};
  color: #fff;
  cursor: pointer;
  box-shadow: ${globalStyles.primaryTextColor} 0px 1px 20px 1px;
`

const ButtonMoveUp = ({ currentTable }) => {
  useEffect(() => {
    const buttonMoveUp = document.getElementById('buttonMoveUp')
    const handleScroll = () => {
      currentTable.scrollTop = 0
    }
    buttonMoveUp.addEventListener('click', handleScroll)
    return () => buttonMoveUp.removeEventListener('click', handleScroll)
  })
  return (
    <StyledButton id="buttonMoveUp">
      <span className="icon-arrow-up2"></span>
    </StyledButton>
  )
}

ButtonMoveUp.propTypes = {
  currentTable: PropTypes.object.isRequired,
}

export default ButtonMoveUp
