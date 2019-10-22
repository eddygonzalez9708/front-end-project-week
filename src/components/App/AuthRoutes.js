import React from 'react'
import { Route } from 'react-router-dom'

import Notes from '../Notes'
import CreateNote from '../CreateNote/'
import Note from '../Note/'
import EditNote from '../EditNote/'

import './index.css'

function AuthRoutes() {
  console.log('auth my man')
  return (
    <div id='content-cont'>
      <Route
        exact path='/'
        component={Notes} />
      <Route
        exact path='/createnote'
        component={CreateNote} />
      <Route
        exact path='/note'
        component={Note} />
      <Route
        exact path='/editnote'
        component={EditNote} />
    </div>
  )
}

export default AuthRoutes