import { useEffect } from 'react'
import styled from 'styled-components'
import globalStyles from '../../styles/globalStyles'
import calculateHeightImgArea from '../helpers/calculateHeightImgArea'
import ReposTable from './ReposTable/ReposTable'
import UserDetail from './UserDetail/UserDetail'

const StyleScreenRepos = styled.div`
  padding: 2%;
  background-color: ${globalStyles.mainDarkBackGround};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  .wrapItemRepos {
    width: 80%;
    display: flex;
    height: 100%;
  }

  @media screen and (max-width: 640px) {
    .wrapItemRepos {
      flex-direction: column;
      width: 90%;
    }
  }
  @media screen and (max-width: 960px) {
    padding: 2% 0;
    .wrapItemRepos {
    }
  }
`

const ScreenRepository = () => {
  // calculate the repository area
  useEffect(() => {
    const elementScreenRepos = document.getElementById('screenRepository')
    const screenWidth = window.innerWidth
    const newHeight = calculateHeightImgArea()
    if (screenWidth > 640) {
      elementScreenRepos.style.height = newHeight + 'px'
    }
  }, [])
  return (
    <StyleScreenRepos id="screenRepository">
      <div className="wrapItemRepos">
        <UserDetail />
        <ReposTable />
      </div>
    </StyleScreenRepos>
  )
}

export default ScreenRepository
