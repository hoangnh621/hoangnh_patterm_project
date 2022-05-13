import React from 'react'
import styled from 'styled-components'

const StyledAvatar = styled.img`
  border-radius: 50%;
`

const Avatar = ({ src, size = 32 }) => {
  return <StyledAvatar src={src} alt={src} height={size} width={size} />
}

export default Avatar
