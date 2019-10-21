import React, { useState } from 'react'
import Loading from '../Loading'

import {
  Button,
  Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import signUpEndpoint from './customHook'

import './index.css'

function Signup(props) {
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState('')

  const [firstnameError, setFirstNameError] = useState('')
  const [lastnameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [res, postUser] = signUpEndpoint()

  const createAccount = event => {
    event.preventDefault()

    if (password !== passwordMatch) {
      setPasswordError('Passwords do not match.')
    } else {
      postUser(
        {
          firstname,
          lastname,
          email,
          password
        },
        props,
        [
          setFirstNameError,
          setLastNameError,
          setEmailError,
          setPasswordError
        ]
      )
    }
  }

  if (res.pending) return <Loading text = 'Registering Account' />

  return (
    <form
      autoComplete = 'off'
      className = 'content-sect'
      onSubmit = {createAccount}>
      <Input
        className = {firstnameError
          ? 'error'
          : null}
        name = 'firstname'
        onChange = {
          (e) => {
            setFirstName(e.target.value.replace(' ', ''))
            setFirstNameError('')}}
        placeholder = 'First Name'
        type = 'text'
        value = {firstname} />
      {firstnameError
        ? <div className = 'error-message'>{firstnameError}</div>
        : null}
      <Input
        className = {lastnameError
          ? 'error'
          : null}
        name = 'lastname'
        onChange = {
          (e) => {
            setLastName(e.target.value.replace(' ', ''))
            setLastNameError('')}}
        placeholder = 'Last Name'
        type = 'text'
        value = {lastname} />
      {lastnameError
        ? <div className = 'error-message'>{lastnameError}</div>
        : null}
      <Input
        className = {emailError
          ? 'error'
          : null}
        name = 'email'
        type = 'text'
        placeholder = 'E-mail'
        value = {email}
        onChange = {
          (e) => {
            setEmail(e.target.value.replace(' ', '').toLowerCase())
            setEmailError('')}} />
      {emailError
        ? <div className = 'error-message'>{emailError}</div>
        : null}
      <Input
        className = {passwordError
          ? 'error'
          : null}
        name = 'password'
        onChange = {
          (e) => {
            setPassword(e.target.value.replace(' ', ''))
            setPasswordError('')}}
        placeholder = 'Password'
        type = 'password'
        value = {password} />
      {passwordError
        ? <div className = 'error-message'>{passwordError}</div>
        : null}
      <Input
        className = {passwordError
          ? 'error'
          : null}
        name = 'passwordMatch'
        onChange = {
          (e) => {
            setPasswordMatch(e.target.value.replace(' ', ''))
            setPasswordError('')}}
        placeholder = 'Confirm Password'
        type = 'password'
        value = {passwordMatch} />
      {passwordError
        ? <div className = 'error-message'>{passwordError}</div>
        : null}
      <Button className = 'pacific-blue auth-btn'>Register</Button>
    </form>
  )
}

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default withRouter(Signup)