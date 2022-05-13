import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import globalStyles from '../../styles/globalStyles'
import SearchInput from '../common/SearchInput/SearchInput'
import { getUserByUserName } from '../common/SearchInput/searchSlice'
import calculateHeightImgArea from '../helpers/calculateHeightImgArea'
import TableGithubUser from './TableGithubUser/TableGithubUser'
import undraw_github from './undraw_github.svg'

const StyledSearchUser = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 2%;
  background-color: ${globalStyles.mainDarkBackGround};
  .searchInputArea {
    display: flex;
    justify-content: center;
  }
  .imgArea {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    img {
      height: 50%;
      width: 50%;
    }
  }
`

const ScreenSearchUser = () => {
  // calculate the search user area
  useEffect(() => {
    const elementScreenSearchUser = document.getElementById('screenSearchUser')
    const newHeightWrapImg = calculateHeightImgArea()
    elementScreenSearchUser.style.height = newHeightWrapImg + 'px'
  }, [])
  const githubUser = useSelector(getUserByUserName)

  return (
    <StyledSearchUser id="screenSearchUser">
      <div className="searchInputArea">
        <SearchInput />
      </div>
      {githubUser.length ? (
        <TableGithubUser />
      ) : (
        <div className="imgArea">
          <img src={undraw_github} alt="undraw_github" />
        </div>
      )}
    </StyledSearchUser>
  )
}

export default ScreenSearchUser
