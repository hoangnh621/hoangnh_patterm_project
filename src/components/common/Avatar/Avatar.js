import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledAvatar = styled.img`
  border-radius: 50%;
`

const Avatar = ({ src, size = 32 }) => {
  return <StyledAvatar src={src} alt={src} height={size} width={size} />
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.number,
}

export default Avatar
