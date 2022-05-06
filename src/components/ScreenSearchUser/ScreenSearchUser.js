import React from 'react'
import styled from 'styled-components'
import globalStyles from '../../styles/globalStyles'

const StyledSearchUser = styled.div`
  padding: 4%;
  padding-top: calc(64px + 4%);
  background-color: ${globalStyles.mainDarkBackGround};
`

const ScreenSearchUser = () => {
  return (
    <StyledSearchUser>
      <div></div>
    </StyledSearchUser>
  )
}

export default ScreenSearchUser
