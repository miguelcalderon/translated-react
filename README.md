# translated-react - Translation management component for React

This is a component for managing and using simple translations in React.js.

## Install

`npm install translated-react`

Or:

`yarn add translated-react`


## Basic Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import TranslatedProvider, { translated } from 'translated-react'

const langTable = {
  en: {
    textForTesting: 'Some text for testing'
  },
  es: {
    textForTesting: 'Algo de texto de prueba'
  }
}

const MyApp = () => (
  <TranslatedProvider lang="es" defaultLang="en" langTable={langTable}>
    {translated(<MyComponent />)}
  </TranslatedProvider>
)

const MyComponent = props => (
  <div>{props.lookup('textForTesting')}</div>
)

ReactDOM.render(MyApp, document.getElementsByTagName('body')[0])
```

## Test

`npm test`

Or:

`yarn test`


## License

*translated-react* is available under MIT. See LICENSE for more details.

