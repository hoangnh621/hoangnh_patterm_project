/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import globalStyles from '../../../styles/globalStyles'
import ButtonMoveUp from '../../common/ButtonMoveUp/ButtonMoveUp'
import {
  fetchGithubRepos,
  getCurrentUser,
  getGithubRepos,
} from '../../ScreenSearchUser/TableGithubUser/Row/slice'
import Row from './Row/Row'

const StyleReposTable = styled.div`
  height: 100%;
  width: 66.6%;
  padding-left: 1.5%;
  #wrapReposTable {
    background-color: ${globalStyles.itemDarkBackGround};
    border-radius: 5px;
    height: 100%;
    #tableHeader {
      padding: 21px;
      font-size: 18px;
      color: ${globalStyles.secondaryTextColor};
      h4 {
        margin: 0;
      }
    }
    #wrapTable {
      box-sizing: border-box;
      overflow: auto;
      padding: 21px;
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
      table {
        width: 100%;
        border-collapse: collapse;
        background-color: ${globalStyles.itemDarkBackGround};
        tr {
          height: 52px;
          padding: 0 2%;
          border-bottom: 0.5px solid ${globalStyles.borderTable};
        }
        th {
          text-align: left;
          font-size: 12px;
          padding: 0;
          color: #fff;
        }
      }
    }
  }
  @media screen and (max-width: 640px) {
    padding: 0;
    width: 100%;
    #wrapReposTable {
      #wrapTable {
        table {
          thead {
            tr {
              th {
                &:nth-child(n + 3) {
                  display: none;
                }
              }
            }
          }
          tbody {
            tr {
              td {
                &:nth-child(n + 3) {
                  display: none;
                }
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 960px) {
    #wrapReposTable {
      #wrapTable {
        table {
          thead {
            tr {
              display: flex;
              th {
                &:nth-child(n + 4) {
                  display: none;
                }
                &:first-child {
                  width: 25%;
                }
                &:nth-child(2) {
                  width: 50%;
                }
                &:last-child {
                  width: 25%;
                }
              }
            }
          }
          tbody {
            tr {
              display: flex;
              td {
                &:nth-child(n + 4) {
                  display: none;
                }
                &:first-child {
                  width: 25%;
                }
                &:nth-child(2) {
                  width: 50%;
                }
                &:last-child {
                  width: 25%;
                }
              }
            }
          }
        }
      }
    }
  }
`

const ReposTable = () => {
  const SIZE_WHEN_UNMOUNT = 0
  const wrapTable = useRef(null)
  const githubRepos = useSelector(getGithubRepos)
  const [toggleButton, setToggleButton] = useState(false)
  const [increasePage, setIncreasePage] = useState(2)
  const handlePage = () => {
    setIncreasePage((prev) => prev + 1)
  }
  //calculate the repository table
  useLayoutEffect(() => {
    const wrapReposTable = document.getElementById('wrapReposTable')
    const wrapReposTableHeight = wrapReposTable
      ? wrapReposTable.getBoundingClientRect().height
      : SIZE_WHEN_UNMOUNT
    const tableHeader = document.getElementById('tableHeader')
    const tableHeaderHeight = tableHeader.getBoundingClientRect().height
    if (wrapTable.current) {
      wrapTable.current.style.height =
        wrapReposTableHeight - tableHeaderHeight + 'px'
    }
  })
  //recalculate when changing window size
  useLayoutEffect(() => {
    const handleResize = () => {
      const wrapReposTable = document.getElementById('wrapReposTable')
      const wrapReposTableHeight = wrapReposTable
        ? wrapReposTable.getBoundingClientRect().height
        : SIZE_WHEN_UNMOUNT
      const tableHeader = document.getElementById('tableHeader')
      const tableHeaderHeight = tableHeader.getBoundingClientRect().height
      if (wrapTable.current) {
        wrapTable.current.style.height =
          wrapReposTableHeight - tableHeaderHeight + 'px'
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.addEventListener('resize', handleResize)
  })
  // add event API scroll
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)
  useLayoutEffect(() => {
    const handleScroll = () => {
      const isScrollBottom =
        wrapTable.current.scrollHeight -
        wrapTable.current.clientHeight -
        wrapTable.current.scrollTop
      if (Math.abs(isScrollBottom) < 1) {
        dispatch(
          fetchGithubRepos({
            username: currentUser.login,
            page: increasePage,
            type: 'add',
          }),
        )
        handlePage()
      }
    }
    wrapTable.current.addEventListener('scroll', handleScroll)
    return () => wrapTable.current.removeEventListener('scroll', handleScroll)
  }, [increasePage])
  // Toggle button
  useLayoutEffect(() => {
    const handleToggleButton = () => {
      if (wrapTable.current.scrollTop > wrapTable.current.clientHeight) {
        setToggleButton(true)
      } else setToggleButton(false)
    }
    wrapTable.current.addEventListener('scroll', handleToggleButton)
    return () =>
      wrapTable.current.removeEventListener('scroll', handleToggleButton)
  }, [])
  return (
    <StyleReposTable>
      <div id="wrapReposTable">
        <div id="tableHeader">
          <h4>Repository List</h4>
        </div>
        <div id="wrapTable" ref={wrapTable}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>URL</th>
                <th>Main Language</th>
                <th>Default Branch</th>
              </tr>
            </thead>
            <tbody>
              {githubRepos.length
                ? githubRepos.map((repos) => {
                    return <Row key={repos.id} repos={repos} />
                  })
                : true}
            </tbody>
          </table>
        </div>
      </div>
      {toggleButton ? <ButtonMoveUp currentTable={wrapTable.current} /> : true}
    </StyleReposTable>
  )
}

export default ReposTable
