/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import globalStyles from '../../../../../styles/globalStyles'
import Portal from '../../../../common/Portal/Portal'
import handleMouseUp from '../../../../helpers/handleMouseUp'
import { getReadMeFile } from '../../../../ScreenSearchUser/TableGithubUser/Row/slice'

const StylePopUp = styled.div`
  background-color: ${globalStyles.itemDarkBackGround};
  border: 1px solid ${globalStyles.primaryTextColor};
  border-radius: 5px;
  color: ${globalStyles.secondaryTextColor};
  width: 70%;
  padding: 2%;
`

const ReadMePopUp = ({ handleToggle }) => {
  const popupReadmeElement = useRef(null)
  //handle mouseup
  useEffect(() => {
    window.addEventListener(
      'mouseup',
      handleMouseUp(popupReadmeElement.current, handleToggle),
    )
    return () =>
      window.removeEventListener(
        'mouseup',
        handleMouseUp(popupReadmeElement.current, handleToggle),
      )
  })
  const readMeFile = useSelector(getReadMeFile)
  let deCode = ''
  if (readMeFile) {
    deCode = atob(readMeFile.content)
  }
  return (
    <Portal>
      <StylePopUp ref={popupReadmeElement}>
        <h4>README FILE</h4>
        {deCode}
      </StylePopUp>
    </Portal>
  )
}

export default ReadMePopUp
