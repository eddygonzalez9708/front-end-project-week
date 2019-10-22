import React, { useState } from 'react'
import {
  Button,
  Icon,
  Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Loading from '../Loading'

import logInEndpoint from './customHook'

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [invalid, setInvalid] = useState('')

  const [res, checkCredentials] = logInEndpoint()

  const logInUser = event => {
    event.preventDefault()

    checkCredentials(
      {
        email,
        password
      },
      props,
      [
        setEmailError,
        setPasswordError,
        setInvalid
      ]
    )
  }

  if (res.pending) return <Loading text = 'Validating Credentials' />

  return (
    <form
      autoComplete = 'off'
      className = 'content-sect'
      onSubmit = {(e) => logInUser(e)}>
      <Input
        className = {invalid || emailError
          ? 'error'
          : null}
        icon
        iconPosition = 'left'
        name = 'email'
        onChange = {(e) => {
          setEmail(e.target.value.replace(' ', '').toLowerCase())
          setEmailError('')
          setInvalid('')}}
        placeholder = 'E-mail'
        type = 'text'
        value = {email}>
        <Icon name = 'user' />
        <input />
      </Input>
      {invalid || emailError
        ? <div className = 'error-message'>{invalid || emailError}</div>
        : null}
      <Input
        className = {invalid || passwordError
          ? 'error'
          : null}
        icon
        iconPosition = 'left'
        name = 'password'
        type = 'password'
        placeholder = 'Password'
        value = {password}
        onChange = {(e) => {
          setPassword(e.target.value.replace(' ', ''))
          setPasswordError('')
          setInvalid('')}}>
        <Icon name = 'lock' />
        <input />
      </Input>
      {invalid || passwordError
        ? <div className = 'error-message'>{invalid || passwordError}</div>
        : null}
      <Button className = 'pacific-blue auth-btn'>Log In</Button>
    </form>
  )
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default withRouter(Login)