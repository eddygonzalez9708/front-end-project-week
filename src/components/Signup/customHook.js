import { useState, useEffect } from 'react'
import axios from 'axios'

const {
  REACT_APP_DEV,
  REACT_APP_PROD } = process.env

const URL = REACT_APP_DEV || REACT_APP_PROD

function signUpEndpoint () {
  return useAsyncEndpoint((data, props, errorFuncs) => ({
    url: `${URL}/api/auth/signup`,
    method: 'POST',
    data,
    props,
    errorFuncs
  }))
}

function useAsyncEndpoint(fn) {
  const [res, setRes] = useState({
    pending: false,
    complete: false,
    error: false,
  })

  const [req, setReq] = useState()

  useEffect(() => {
    let isSubscribed = true

    if (!req) return
    setRes({
      ...res,
      pending: true
    })

    const {
      url,
      method,
      data,
      props
    } = req

    const [
      setFirstNameError,
      setLastNameError,
      setEmailError,
      setPasswordError
    ] = req.errorFuncs

    axios({url, method, data})
      .then(() =>
        setTimeout(() => {
          if (isSubscribed) {
            setRes({
              pending: false,
              error: false,
              complete: true
            })

            props.history.push('/login')
          }
        }, 3000))
      .catch(err => {
        const {
          status,
          data } = err.response

        const {
          firstnameError,
          lastnameError,
          emailError,
          passwordError
        } = data

        setTimeout(() => {
          if (isSubscribed) {
            if (status === 400) {
              setFirstNameError(firstnameError ? firstnameError : '')
              setLastNameError(lastnameError ? lastnameError: '')
              setEmailError(emailError ? emailError : '')
              setPasswordError(passwordError ? passwordError : '')
            } else {
              alert(`Error: ${data.msg1}`)
            }

            setRes({
              pending: false,
              complete: true,
              error: true,
            })
          }
        }, 3000)
      })

    return () => isSubscribed = false
  }, [req])

  return [res, (data, props, errorFuncs) => setReq(fn(data, props, errorFuncs))]
}

export default signUpEndpoint