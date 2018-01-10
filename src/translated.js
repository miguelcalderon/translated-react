import React from 'react'
import PropTypes from 'prop-types'

let lang
let defaultLang
let langTable
let cached = {}

const processTermVariables = (translatedTerm, vars = {}) => {
  let processedTerm = translatedTerm
  Object.keys(vars).forEach(key => {
    processedTerm = processedTerm.replace(`{${key}}`, vars[key])
  })
  return processedTerm
}
const lookup = (term, vars) => {
  if (cached[term] && vars === undefined) return cached[term]
  let localTerm = langTable[lang]
    ? langTable[lang][term]
      ? processTermVariables(langTable[lang][term], vars)
      : langTable[defaultLang]
        ? langTable[defaultLang][term]
          ? processTermVariables(langTable[defaultLang][term], vars)
          : term
        : term
    : langTable[defaultLang]
      ? langTable[defaultLang][term]
        ? processTermVariables(langTable[defaultLang][term], vars)
        : term
      : term
  if (!cached[term] && vars === undefined) {
    cached[term] = localTerm
  }
  return localTerm
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
