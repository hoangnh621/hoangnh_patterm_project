/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import rehypeRaw from 'rehype-raw'
import styled from 'styled-components'
import globalStyles from '../../../../../styles/globalStyles'
import Button from '../../../../common/Button/Button'
import Portal from '../../../../common/Portal/Portal'
import calculateHeightImgArea from '../../../../helpers/calculateHeightImgArea'
import {
  getReadMeFile,
  removeReadMeFile,
} from '../../../../ScreenSearchUser/TableGithubUser/Row/slice'

const StylePopUp = styled.div`
  background-color: ${globalStyles.itemDarkBackGround};
  border: 1px solid ${globalStyles.primaryTextColor};
  border-radius: 5px;
  color: ${globalStyles.secondaryTextColor};
  padding: 20px;
  position: absolute;
  overflow: auto;
  /* width */
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${globalStyles.primaryTextColor};
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${globalStyles.primaryTextColor};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-corner {
    background-color: ${globalStyles.itemDarkBackGround};
    border-radius: 5px;
  }

  .headerReadMe {
    display: flex;
    justify-content: space-between;
    h4 {
      margin: 0;
    }
  }
`

const ReadMePopUp = ({ handleToggle }) => {
  const dispatch = useDispatch()
  const popupReadmeElement = useRef(null)
  //calculate position and height
  useEffect(() => {
    //set top
    const header = document.getElementById('header')
    const headerHeight = header.getBoundingClientRect().height
    popupReadmeElement.current.style.top = headerHeight + 'px'
    // set left
    const wrapDetailItem = document.getElementById('wrapDetailItem')
    popupReadmeElement.current.style.left =
      wrapDetailItem.getBoundingClientRect().left + 'px'
    //calculate height
    const newHeight = calculateHeightImgArea()
    popupReadmeElement.current.style.height = newHeight + 'px'
    //calculate width
    const wrapItemRepos = document.getElementById('wrapItemRepos')
    popupReadmeElement.current.style.width =
      wrapItemRepos.getBoundingClientRect().width + 'px'
  }, [])
  //recalculate when resize
  useEffect(() => {
    const handleResize = () => {
      //set top
      const header = document.getElementById('header')
      const headerHeight = header.getBoundingClientRect().height
      popupReadmeElement.current.style.top = headerHeight + 'px'
      // set left
      const wrapDetailItem = document.getElementById('wrapDetailItem')
      popupReadmeElement.current.style.left =
        wrapDetailItem.getBoundingClientRect().left + 'px'
      //calculate height
      const newHeight = calculateHeightImgArea()
      popupReadmeElement.current.style.height = newHeight + 'px'
      //calculate width
      const wrapItemRepos = document.getElementById('wrapItemRepos')
      popupReadmeElement.current.style.width =
        wrapItemRepos.getBoundingClientRect().width + 'px'
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })
  //handle mouseup
  useEffect(() => {
    const clickOutside = (e) => {
      const withinBoundaries = e
        .composedPath()
        .includes(popupReadmeElement.current)
      if (!withinBoundaries) {
        handleToggle()
        dispatch(removeReadMeFile())
      }
    }
    window.addEventListener('mouseup', clickOutside)
    return () => window.removeEventListener('mouseup', clickOutside)
  })
  const readMeFile = useSelector(getReadMeFile)
  let deCode = ''
  if (readMeFile) {
    deCode = decodeURIComponent(escape(window.atob(readMeFile.content)))
  }
  return (
    <Portal>
      <StylePopUp ref={popupReadmeElement}>
        <div className="headerReadMe">
          <h4>README FILE</h4>
          <Button onClick={handleToggle}>Close</Button>
        </div>
        <ReactMarkdown children={deCode} rehypePlugins={[rehypeRaw]} />
      </StylePopUp>
    </Portal>
  )
}

ReadMePopUp.propTypes = {
  handleToggle: PropTypes.func,
}

export default ReadMePopUp
