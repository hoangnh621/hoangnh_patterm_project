// @ts-nocheck
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import globalStyles from '../../../styles/globalStyles'
import ButtonMoveUp from '../../common/ButtonMoveUp/ButtonMoveUp'
import {
  fetchGithubUser,
  getSearchValue,
  getUserByUserName,
} from '../../common/SearchInput/searchSlice'
import calculateHeightImgArea from '../../helpers/calculateHeightImgArea'
import parsePxToNumber from '../../helpers/parsePxToNumber'
import Row from './Row/Row'

const StyleTable = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${globalStyles.mainDarkBackGround};
  padding-top: 2%;

  div {
    width: 80%;
    padding: 0 2%;
    background-color: ${globalStyles.itemDarkBackGround};
    border-radius: 6px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;
    /* width */
    &::-webkit-scrollbar {
      width: 10px;
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

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: ${globalStyles.itemDarkBackGround};
      tr {
        height: 52px;
        padding: 0 2%;
      }
      th {
        text-align: left;
        font-size: 12px;
        padding: 0;
        color: ${globalStyles.secondaryTextColor};
      }
    }
  }
  @media screen and (max-width: 640px) {
    table {
      thead {
        tr {
          th {
            &:nth-child(n + 4) {
              display: none;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            &:nth-child(n + 4) {
              display: none;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 960px) {
    table {
      thead {
        tr {
          th {
            &:nth-child(n + 5) {
              display: none;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            &:nth-child(n + 5) {
              display: none;
            }
          }
        }
      }
    }
  }
`

const TableGithubUser = () => {
  const [increasePage, setIncreasePage] = useState(2)
  const handlePage = () => {
    setIncreasePage((prev) => prev + 1)
  }
  const [toggleButton, setToggleButton] = useState(false)
  const scrollArea = document.getElementById('scrollArea')
  // calculate table height
  useEffect(() => {
    const TOP_BOTTOM_PADDING = 2
    const elementScreenSearchUser = document.getElementById('screenSearchUser')
    const newHeightWrapImg = calculateHeightImgArea()
    const wrapTable = document.getElementById('wrapTable')
    const screenSearchUserPadding = window
      .getComputedStyle(elementScreenSearchUser)
      .getPropertyValue('padding')
    const paddingValue = parsePxToNumber(screenSearchUserPadding)
    const searchInput = document.getElementById('searchInput')
    const heightSearchInput = searchInput.offsetHeight
    wrapTable.style.height =
      newHeightWrapImg -
      heightSearchInput -
      TOP_BOTTOM_PADDING * paddingValue +
      'px'
  }, [])
  //add event API scroll
  const dispatch = useDispatch()
  const searchValue = useSelector(getSearchValue)
  const githubUsers = useSelector(getUserByUserName)
  useEffect(() => {
    const scrollArea = document.getElementById('scrollArea')
    const handleScroll = () => {
      const isScrollBottom =
        scrollArea.scrollHeight - scrollArea.clientHeight - scrollArea.scrollTop
      if (Math.abs(isScrollBottom) < 1) {
        dispatch(
          fetchGithubUser({
            username: searchValue,
            page: increasePage,
            type: 'add',
          }),
        )
        handlePage()
      }
    }
    scrollArea.addEventListener('scroll', handleScroll)
    return () => scrollArea.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [increasePage])
  // Toggle button
  useEffect(() => {
    const scrollArea = document.getElementById('scrollArea')
    const handleToggleButton = () => {
      if (scrollArea.scrollTop > scrollArea.clientHeight) {
        setToggleButton(true)
      } else setToggleButton(false)
    }
    scrollArea.addEventListener('scroll', handleToggleButton)
    return () => scrollArea.removeEventListener('scroll', handleToggleButton)
  }, [])

  return (
    <StyleTable id="wrapTable">
      <div id="scrollArea">
        <table>
          <thead>
            <tr>
              <th>AVATAR</th>
              <th>ID</th>
              <th>USER NAME</th>
              <th>GITHUB URL</th>
              <th>ROLE</th>
              <th>SCORE</th>
            </tr>
          </thead>
          <tbody>
            {githubUsers
              ? githubUsers.map((user) => {
                  return <Row key={user.id} user={user} />
                })
              : true}
          </tbody>
        </table>
      </div>
      {toggleButton ? <ButtonMoveUp currentTable={scrollArea} /> : true}
    </StyleTable>
  )
}

export default TableGithubUser