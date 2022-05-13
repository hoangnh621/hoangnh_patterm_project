import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import globalStyles from '../../../styles/globalStyles'
import './icomoon/style.css'

const Logo = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${globalStyles.itemDarkBackGround};
  a {
    display: flex;
    text-decoration: none;
    color: ${globalStyles.primaryTextColor};
    span {
      font-size: 32px;
      margin-right: 10px;
    }
    h2 {
      margin: 0;
      font-size: 24px;
      line-height: 34px;
    }
  }

  @media screen and (max-width: 960px) {
    a {
      span {
        font-size: 36px;
      }
      h2 {
        font-size: 28px;
        line-height: 38px;
      }
    }
  }

  @media screen and (max-width: 640px) {
    a {
      span {
        font-size: 40px;
      }
      h2 {
        font-size: 32px;
        line-height: 42px;
      }
    }
  }
`

const Header = () => {
  return (
    <Logo id="header">
      <NavLink to="/">
        <span className="icon-github"></span>
        <h2>GITHUB</h2>
      </NavLink>
    </Logo>
  )
}

export default Header
