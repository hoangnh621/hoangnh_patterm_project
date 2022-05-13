import React from 'react'
import styled from 'styled-components'
import globalStyles from '../../../styles/globalStyles'

const StyleBadge = styled.span`
  padding: 4px 7px;
  border-radius: 5px;
  font-size: 12px;
  color: ${globalStyles.successTextColor};
  background-color: ${globalStyles.successBackground};
`

const Badge = ({ content }) => {
  return <StyleBadge>{content}</StyleBadge>
}

export default Badge
