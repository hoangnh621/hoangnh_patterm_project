import { useEffect, useRef } from 'react'
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
  const githubUser = useSelector(getUserByUserName)
  const refScreenSearchUser = useRef(null)
  // calculate the search user area
  useEffect(() => {
    const newHeightWrapImg = calculateHeightImgArea()
    refScreenSearchUser.current.style.height = newHeightWrapImg + 'px'
  }, [])
  //recalculate when changing window size
  useEffect(() => {
    const handleResize = () => {
      const newHeightWrapImg = calculateHeightImgArea()
      refScreenSearchUser.current.style.height = newHeightWrapImg + 'px'
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <StyledSearchUser id="screenSearchUser" ref={refScreenSearchUser}>
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
