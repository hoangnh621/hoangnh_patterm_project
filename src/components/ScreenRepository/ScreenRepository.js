import { useEffect, useRef } from 'react'
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
  const refScreenRepository = useRef(null)
  // calculate the repository area
  useEffect(() => {
    const elementScreenRepos = document.getElementById('screenRepository')
    const screenWidth = window.innerWidth
    const newHeight = calculateHeightImgArea()
    if (screenWidth > 640) {
      elementScreenRepos.style.height = newHeight + 'px'
    }
  }, [])
  //recalculate when changing window size
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      const newHeight = calculateHeightImgArea()
      console.log('newHeight', newHeight)
      if (screenWidth > 640) {
        refScreenRepository.current.style.height = newHeight + 'px'
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })
  return (
    <StyleScreenRepos id="screenRepository" ref={refScreenRepository}>
      <div className="wrapItemRepos">
        <UserDetail />
        <ReposTable />
      </div>
    </StyleScreenRepos>
  )
}

export default ScreenRepository
