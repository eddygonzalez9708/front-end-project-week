import React, { useState, useEffect } from 'react'
import decode from 'jwt-decode'
import axios from 'axios'
import {
  Link,
  withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { DeleteModal } from '../CustomModals'
import Loading from '../Loading'

import './index.css'

const {
  REACT_APP_DEV,
  REACT_APP_PROD } = process.env

const URL = REACT_APP_DEV || REACT_APP_PROD

function Note(props) {
  const TOKEN = localStorage.getItem('token')

  const REQUEST_OPTIONS = {
    headers: {
      Authorization: TOKEN
    }
  }

  const [id, setId] = useState('')
  const [userId, setUserId] = useState('')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const [res, setRes] = useState({
    pending: true,
    complete: false
  })

  const [modal, setModal] = useState(false)

  useEffect(() => {
    let isSubscribed = true
    const { id: userId } = decode(TOKEN)
    const { state } = props.location

    if (!state) {
      props.history.push('/')
    }

    const {id: noteId } = state

    axios.get(`${URL}/api/users/${userId}/note/${noteId}`, REQUEST_OPTIONS)
      .then(res => {
        setTimeout(() => {
          if (isSubscribed) {
            const {
              id,
              title,
              text
            } = res.data

            setId(id)
            setUserId(userId)
            setTitle(title)
            setText(text)

            setRes({
              pending: false,
              complete: true
            })
          }
        }, 1000)
      })
      .catch(err => {
        const {
          status,
          data } = err.response

        if (status !== 500) {
          alert(`Error: ${data}`)
        } else {
          alert(`Error: ${data.msg1}`)
        }

        setRes({
          pending: false,
          complete: true
        })
      })
  }, [])

  const removeNote = () => {
    axios.delete(`${URL}/api/users/${userId}/note/${id}`, REQUEST_OPTIONS)
      .then(() => props.history.push('/'))
      .catch(err => {
        const {
          status,
          data } = err.response

        if (status !== 500) {
          alert(`Error: ${data}`)
        } else {
          alert(`Error: ${data.msg1}`)
        }
      })
  }

  if (res.pending) return <Loading text = 'Loading Note' />

  return (
    <div className = 'content-sect padding'>
      <div className = 'noteButtons'>
        <Link
          className = 'editLink'
          to = {{
            pathname: '/editnote',
            state: { id }}}>
          <h3>edit</h3>
        </Link>
        <h3 onClick = {() => setModal(!modal)}>delete</h3>
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
      <DeleteModal
        modal = {modal}
        toggle = {() => setModal(!modal)}
        removeNote = {removeNote} />
    </div>
  )
}

Note.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default withRouter(Note)