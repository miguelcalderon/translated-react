import React from 'react'
import { translated } from 'translated-react'
import PropTypes from 'prop-types'

const MyComponent = ({lookup: t}) => {
  return (
    <div>{t('textForTesting')}</div>
  )
}
MyComponent.PropTypes = {
  lookup: PropTypes.func.isRequired
}

const TranslatedMyComponent = translated(MyComponent)

export default TranslatedMyComponent
