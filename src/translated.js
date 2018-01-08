import React from 'react'
import PropTypes from 'prop-types'

let lang
let defaultLang
let langTable
let cached = {}

const lookup = term => {
  if (cached[term]) return cached[term]
  cached[term] = langTable[lang]
    ? langTable[lang][term]
      ? langTable[lang][term]
      : langTable[defaultLang]
        ? langTable[defaultLang][term]
          ? langTable[defaultLang][term]
          : term
        : term
    : langTable[defaultLang]
      ? langTable[defaultLang][term]
        ? langTable[defaultLang][term]
        : term
      : term
  return cached[term]
}

const TranslatedProvider = props => {
  ({ lang, defaultLang, langTable } = props)
  cached = {}
  return (
    <div>{props.children}</div>
  )
}
TranslatedProvider.propTypes = {
  lang: PropTypes.string.isRequired,
  defaultLang: PropTypes.string.isRequired,
  langTable: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export const translated = Component => props => (<Component lookup={lookup} {...props} />)

export default TranslatedProvider
