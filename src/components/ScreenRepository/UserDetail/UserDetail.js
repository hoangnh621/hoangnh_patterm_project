import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import globalStyles from '../../../styles/globalStyles'
import Avatar from '../../common/Avatar/Avatar'
import { getCurrentUser } from '../../ScreenSearchUser/TableGithubUser/Row/slice'

const StyledUserDetail = styled.div`
  height: 100%;
  width: 33.3%;
  padding-right: 1.5%;
  #wrapDetailItem {
    background-color: ${globalStyles.itemDarkBackGround};
    border-radius: 5px;
    height: 100%;
    div {
      padding: 6%;
      &:first-child {
        padding-top: 62px;
        display: flex;
        flex-direction: column;
        align-items: center;
        h4 {
          color: ${globalStyles.secondaryTextColor};
          font-size: 18px;
          margin-bottom: 8px;
        }
        div {
          display: flex;
          justify-content: space-evenly;
        }
      }
      &:last-child {
        h3 {
          color: ${globalStyles.secondaryTextColor};
          font-size: 18px;
        }
        p {
          color: ${globalStyles.secondaryTextColor};
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

  @media screen and (max-width: 640px) {
    padding: 0;
    width: 100%;
    margin-bottom: 8px;
  }
  @media screen and (max-width: 960px) {
    padding: 0;
  }
`

const UserDetail = () => {
  const currentUser = useSelector(getCurrentUser)

  return (
    <StyledUserDetail>
      <div id="wrapDetailItem">
        {currentUser ? (
          <>
            <div>
              <Avatar src={currentUser.avatar_url} size={110} />
              <h4>{currentUser.login}</h4>
            </div>
            <div>
              <h3>Details</h3>
              <hr />
              <p>Username: {currentUser.login}</p>
              <p>ID: {currentUser.id}</p>
              <p>Link: {currentUser.html_url}</p>
              <p>Type: {currentUser.type}</p>
              <p>Score: {currentUser.score}</p>
              <p>Site Admin: {currentUser.site_admin ? 'True' : 'False'}</p>
            </div>
          </>
        ) : (
          true
        )}
      </div>
    </StyledUserDetail>
  )
}

export default UserDetail
