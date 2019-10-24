import React, { useState } from 'react'
import decode from 'jwt-decode'
import {
  Form,
  Input,
  TextArea,
  Button } from 'semantic-ui-react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const {
  REACT_APP_DEV,
  REACT_APP_PROD } = process.env

const URL = REACT_APP_DEV || REACT_APP_PROD

function CreateNote(props) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const [titleError, setTitleError] = useState('')
  const [textError, setTextError] = useState('')

  const submit = (event) => {
    event.preventDefault()

    if (!title && !text) {
      setTitleError('The title field is required.')
      setTextError('The text field is required.')
      return
    } else if (!title) {
      setTitleError('The title field is required.')
      return
    } else if (!text) {
      setTextError('The text field is required.')
      return
    }

    if (title.length > 30 && text.length > 1000) {
      setTitleError('The title field may only contain a maximum of 30 characters.')
      setTextError('The text field may only contain a maximum of 1000 characters.')
      return
    } else if (title.length > 30) {
      setTitleError('The title field may only contain a maximum of 30 characters.')
      return
    } else if (text.length > 1000) {
      setTextError('The text field may only contain a maximum of 1000 characters.')
      return
    }

    const TOKEN = localStorage.getItem('token')
    const USER_ID = decode(TOKEN).id

    const REQUEST_OPTIONS = {
      headers: {
        Authorization: TOKEN
      }
    }

    axios.post(`${URL}/api/users/${USER_ID}/notes`,
      {
        title,
        text
      }, REQUEST_OPTIONS)
      .then(res => {
        const { id } = res.data
        props.history.push({
          pathname: '/note',
          state: { id }
        })
      })
      .catch(err => {
        const {
          status,
          data } = err.response

        const {
          titleError,
          textError } = data

        if (status === 400) {
          setTitleError(titleError ? titleError : '')
          setTextError(textError ? textError : '')
        } else {
          alert(`Error: ${data.msg1}`)
        }
      })
  }

  return (
    <div className = 'content-sect padding'>
      <h2>Create New Note:</h2>
      <Form
        className = 'create-note'
        onSubmit = {submit}>
        <Input
          id = 'title'
          className = {titleError
            ? 'error'
            : null}
          name = 'title'
          type = 'text'
          placeholder = 'Note Title'
          value = {title}
          onChange={(e) => {
            setTitle(e.target.value)
            setTitleError('')}} />
        {titleError
          ? <div className = 'error-message titleError'>{titleError}</div>
          : null}
        <TextArea
          id = 'text'
          className = {textError
            ? 'error'
            : null}
          name = 'text'
          placeholder = 'Note Content'
          cols = '50'
          rows = '15'
          value = {text}
          onChange={(e) => {
            setText(e.target.value)
            setTextError('')}} />
        {textError
          ? <div className = 'error-message textError'>{textError}</div>
          : null}
        <Button
          id = 'save'
          className = 'pacific-blue'>
          Save
        </Button>
      </Form>
    </div>
  )
}

CreateNote.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default withRouter(CreateNote)