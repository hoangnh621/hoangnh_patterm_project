import React from 'react'
import styled from 'styled-components'
import pageNotFound from './undraw_page_not_found.svg'

const StylePageNotFound = styled.div`
  display: flex;
  justify-content: center;
`

const PageNotFound = () => {
  return (
    <StylePageNotFound>
      <img src={pageNotFound} alt="pageNotFound" />
    </StylePageNotFound>
  )
}

export default PageNotFound
