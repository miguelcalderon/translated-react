import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TranslatedProvider from 'translated-react'
import TranslatedMyComponent from 'component'

const langTable = {
  en: {
    textForTesting: 'Some text for testing'
  },
  es: {
    textForTesting: 'Algo de texto de prueba'
  }
}

class MyApp extends Component {
  constructor () {
    super()
    this.state = {
      language: 'es'
    }
  }

  updateLanguage = e => {
    this.setState({ language: e.target.value })
  }

  render () {
    return (
      <TranslatedProvider lang={this.state.language} defaultLang="en" langTable={langTable}>
        <label htmlFor="es">Español<input id="es" type="radio" name="language" value="es" onClick={this.updateLanguage} /></label><br />
        <label htmlFor="en">English<input id="en" type="radio" name="language" value="en" onClick={this.updateLanguage} /></label><br />
        <TranslatedMyComponent />
      </TranslatedProvider>
    )
  }
}

ReactDOM.render(<MyApp />, document.getElementsByTagName('body')[0].appendChild(document.createElement('div')))
