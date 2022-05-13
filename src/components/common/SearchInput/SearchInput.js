import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import globalStyles from '../../../styles/globalStyles'
import './icomoonClose/style.css'
import './icomoonSearch/style.css'
import {
  fetchGithubUser,
  getSearchValue,
  removeGithubUser,
  setSearchValue,
} from './searchSlice'

const StyleInput = styled.div`
  border-radius: 6px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${globalStyles.itemDarkBackGround};
  input {
    color: #fff;
    height: 62px;
    flex: 1;
    padding: 0;
    border: none;
    background-color: ${globalStyles.itemDarkBackGround};
    &:focus-visible {
      outline: none;
    }
    &::placeholder {
      color: ${globalStyles.buttonSearchBackGround};
    }
  }
  span {
    padding: 0 21px;
    color: ${globalStyles.buttonSearchBackGround};
    font-size: 21px;
    &:hover {
      color: ${globalStyles.primaryTextColor};
    }
  }
  button {
    background-color: ${globalStyles.itemDarkBackGround};
    cursor: pointer;
    border: none;
    padding: 0;
    line-height: 0;
  }
`

const SearchInput = () => {
  const searchValue = useSelector(getSearchValue)
  const dispatch = useDispatch()
  useEffect(() => {
    if (searchValue !== '') {
      dispatch(
        fetchGithubUser({ username: searchValue, page: 1, type: 'replace' }),
      )
    } else {
      dispatch(removeGithubUser())
    }
  }, [dispatch, searchValue])

  return (
    <StyleInput id="searchInput">
      <span className="icon-search"></span>
      <input
        type="text"
        placeholder="Search by username"
        value={searchValue}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
      />
      <button
        onClick={() => {
          dispatch(removeGithubUser())
          dispatch(setSearchValue(''))
        }}
      >
        <span className="icon-close"></span>
      </button>
    </StyleInput>
  )
}

export default SearchInput
