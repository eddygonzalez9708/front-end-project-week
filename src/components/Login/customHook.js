import { useState, useEffect } from 'react'
import axios from 'axios'

const {
  REACT_APP_DEV,
  REACT_APP_PROD } = process.env

const URL = REACT_APP_DEV || REACT_APP_PROD

function logInEndpoint() {
  return useAsyncEndpoint((data, props, errorFuncs) => ({
    url: `${URL}/api/auth/login`,
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
    error: false
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
      props,
    } = req

    const [
      setEmailError,
      setPasswordError,
      setInvalid
    ] = req.errorFuncs

    axios({ url, method, data })
      .then(res => {
        setTimeout(() => {
          if (isSubscribed) {
            const { token } = res.data

            if (token) {
              localStorage.setItem('token', token)

              setRes({
                pending: false,
                complete: true,
                error: false
              })

              props.history.push('/')
            }
          }
        }, 3000)
      })
      .catch(err => {
        const {
          status,
          data
        } = err.response

        const {
          emailError,
          passwordError,
          invalid
        } = data

        setTimeout(() => {
          if (isSubscribed) {
            if (status === 400 || status === 401) {
              setEmailError(emailError ? emailError : '')
              setPasswordError(passwordError ? passwordError : '')
              setInvalid(invalid ? invalid : '')
            } else {
              alert(`Error: ${data}`)
            }

            setRes({
              pending: false,
              complete: true,
              error: true
            })
          }
        }, 3000)
      })

    return () => isSubscribed = false
  }, [req])

  return [res, (data, props, errorFuncs) => setReq(fn(data, props, errorFuncs))]
}

export default logInEndpoint