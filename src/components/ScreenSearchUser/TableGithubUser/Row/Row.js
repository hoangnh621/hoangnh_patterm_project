// @ts-nocheck
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import globalStyles from '../../../../styles/globalStyles'
import Avatar from '../../../common/Avatar/Avatar'
import Badge from '../../../common/Badge/Badge'
import { fetchGithubRepos, setCurrentUser } from './slice'

const StyleRow = styled.tr`
  height: 52px;
  padding: 0 2%;
  border-bottom: 0.5px solid ${globalStyles.borderTable};
  td {
    font-size: 13px;
    color: ${globalStyles.secondaryTextColor};
  }
  &:hover {
    background-color: ${globalStyles.tableRowHover};
    cursor: pointer;
    td {
      color: #fff;
    }
  }
`

const Row = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const moveRepoScreen = () => {
    navigate('/repository')
    dispatch(
      fetchGithubRepos({ username: user.login, page: 1, type: 'replace' }),
    )
    dispatch(setCurrentUser(user))
  }

  return (
    <StyleRow onClick={moveRepoScreen}>
      <td>
        <Avatar src={user.avatar_url} />
      </td>
      <td>{user.id}</td>
      <td>{user.login}</td>
      <td>{user.html_url}</td>
      <td>
        <Badge content={user.type} />
      </td>
      <td>{user.score}</td>
    </StyleRow>
  )
}

export default Row
