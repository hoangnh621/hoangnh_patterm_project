import React from 'react'
import styled from 'styled-components'
import globalStyles from '../../../../styles/globalStyles'

const StyleRow = styled.tr`
  height: 52px;
  padding: 0 2%;
  border-bottom: 0.5px solid ${globalStyles.borderTable};
  td {
    font-size: 13px;
    color: ${globalStyles.secondaryTextColor};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &:hover {
    background-color: ${globalStyles.tableRowHover};
    cursor: pointer;
    td {
      color: #fff;
    }
  }
`

const Row = ({ repos }) => {
  return (
    <StyleRow>
      <td>{repos.name}</td>
      <td>{repos.html_url}</td>
      <td>{repos.language}</td>
      <td>{repos.default_branch}</td>
    </StyleRow>
  )
}

export default Row
