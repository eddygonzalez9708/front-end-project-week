import React, { useState, useEffect } from 'react'
import {
  Sidebar,
  Button } from 'semantic-ui-react'
import {
  Link,
  withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Navigation from '../Navigation'
import Routes from './Routes'
import AuthRoutes from './AuthRoutes'

import './index.css'

function App(props) {
  const TOKEN = localStorage.getItem('token')

  const [isOpen, setToggle] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  const { history } = props

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  })

  return (
    <Sidebar.Pushable>
      <Sidebar
        id = 'navigation-sidebar'
        animation = 'overlay'
        direction = 'right'
        visible = {isOpen && width <= 768}
        onHide = {() => setToggle(!isOpen)}>
        <SideBarBtns redirect = {props.history.push} />
      </Sidebar>

      <Sidebar.Pusher dimmed = {isOpen}>
        <div id='app'>
          <Navigation
            toggle = {() => setToggle(!isOpen)}
            redirect = {history.push} />
          {TOKEN
            ? <AuthRoutes />
            : <Routes /> }
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

function SideBarBtns({ redirect }) {
  const TOKEN = localStorage.getItem('token')

  const logOut = () => {
    if (TOKEN) {
      localStorage.removeItem('token')
      redirect('/')
    }
  }

  return (
    TOKEN
      ? [
        <Button
          key = {0}
          as = {Link}
          to = '/'
          className = 'pacific-blue'>
          View Notes
        </Button>,
        <Button
          key = {1}
          as = {Link}
          to = '/createnote'
          className = 'pacific-blue'>
          + Create Note
        </Button>,
        <Button
          key = {2}
          className = 'milano-red'
          onClick = {logOut}>
          Log Out
        </Button>]
      : [
        <Button
          key = {0}
          as = {Link}
          className = 'pacific-blue'
          to = '/signup'>
          Sign Up
        </Button>,
        <Button
          key =  {1}
          as = {Link}
          className = 'pacific-blue'
          to = '/login'>
          Log In
        </Button>
      ]
  )
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default withRouter(App)