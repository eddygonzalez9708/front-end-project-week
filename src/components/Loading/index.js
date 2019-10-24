import React from 'react'
import PropTypes from 'prop-types'
import { Loader } from 'semantic-ui-react'

function Loading({ text }) {
  return (
    <div className = 'loading'>
      <Loader active inline = 'centered'>{text}</Loader>
    </div>
  )
}

Loading.propTypes = {
  text: PropTypes.string.isRequired
}

export default Loading