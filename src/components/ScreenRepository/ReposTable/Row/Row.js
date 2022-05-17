import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import globalStyles from '../../../../styles/globalStyles'
import {
  fetchReadMeFile,
  getCurrentUser,
} from '../../../ScreenSearchUser/TableGithubUser/Row/slice'
import ReadMePopUp from './ReadMePopUp/ReadMePopUp'

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
  const [isPopup, setIsPopup] = useState(false)
  const handleToggle = () => {
    setIsPopup(!isPopup)
  }
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)

  const popupReadme = () => {
    dispatch(
      fetchReadMeFile({
        username: currentUser.login,
        selectedRepo: repos.name,
      }),
    )
    handleToggle()
  }

  return (
    <StyleRow onClick={popupReadme}>
      <td>{repos.name}</td>
      <td>{repos.html_url}</td>
      <td>{repos.language}</td>
      <td>{repos.default_branch}</td>
      {isPopup ? <ReadMePopUp handleToggle={handleToggle} /> : true}
    </StyleRow>
  )
}

Row.propTypes = {
  repos: PropTypes.object.isRequired,
}

export default Row
