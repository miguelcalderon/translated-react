import React, { Component } from 'react'
import PropTypes from 'prop-types'

let translatedState = {
}

let cached = {}
let provider

const processTermVariables = (translatedTerm, vars = {}) => {
  let processedTerm = translatedTerm
  Object.keys(vars).forEach(key => {
    processedTerm = processedTerm.replace(`{${key}}`, vars[key])
  })
  return processedTerm
}
const getTranslatedState = () => {
  return translatedState
}
const setTranslatedState = newTranslatedState => {
  translatedState = { ...translatedState, ...newTranslatedState }
}

const lookup = (term, vars) => {
  const { lang, defaultLang, langTable } = translatedState
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

/**
 * @typedef {Object} props
 * @property {String} lang - Current translation language.
 * @property {String} defaultLang - Default language for terms not found in current language.
 * @property {Object} langTable - Javascript object with translation data.
 * @ignore
 */
/**
 *
 * @param {props}
 * @constructor
 * Initializes the component, language and translation data.
 */
class TranslatedProvider extends Component {
  constructor (props) {
    super(props)
    setTranslatedState({
      lang: props.lang,
      defaultLang: props.defaultLang,
      langTable: props.langTable
    })
    this.state = translatedState
    provider = this
  }
  componentWillUnmount() {
    provider = null
  }
  update () {
    const { lang } = translatedState
    this.setState({ lang })
    translateds.forEach(translatedComponent => {
      translatedComponent.setState({ lang })
    })
  }
  render () {
    cached = {}
    return (
      <div>{this.props.children}</div>
    )
  }
}
TranslatedProvider.propTypes = {
  lang: PropTypes.string.isRequired,
  defaultLang: PropTypes.string.isRequired,
  langTable: PropTypes.object.isRequired,
  children: PropTypes.node
}

const translateds = []

const registerTranslatedComponent = component => translateds.push(component)
const unregisterTranslatedComponent = component => translateds.find((translatedComponent, i) => {
  if (translatedComponent === component) {
    translateds.splice(i, 1)
    return true
  }
})

/**
 * @typedef {Object} props
 * @ignore
 */
/**
 *
 * @param {props}
 * @constructor
 * Wraps the component(s) to be using translations.
 */
const translated = TranslatedComponent => class extends Component {
  constructor (props) {
    super(props)
    this.state = { lang: translatedState.lang }
    registerTranslatedComponent(this)
  }
  componentWillUnmount() {
    unregisterTranslatedComponent(this)
  }
  render () {
    return (
      <TranslatedComponent lookup={lookup} {...this.props} />
    )
  }
}

/**
 *
 * @param lang
 * @function
 * Sets the current lenguage for subsequent translations and triggers translated components rerendering in the new language.
 */
const setLang = lang => {
  if (lang !== getTranslatedState().lang) {
    cached = {}
    setTranslatedState({ lang })
    provider.update()
  }
}

export { translated, setLang }
export default TranslatedProvider
