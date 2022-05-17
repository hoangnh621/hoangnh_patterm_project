import PropTypes from 'prop-types'
import styled from 'styled-components'
import globalStyles from '../../../styles/globalStyles'

const StyleButton = styled.button`
  height: 37px;
  border-radius: 5px;
  border: none;
  background-color: ${globalStyles.primaryTextColor};
  color: #fff;
  cursor: pointer;
  box-shadow: ${globalStyles.primaryTextColor} 0px 1px 20px 1px;
`

const Button = ({ children, onClick }) => {
  return <StyleButton onClick={onClick}>{children}</StyleButton>
}

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
