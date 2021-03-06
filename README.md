[![npm version](https://badge.fury.io/js/translated-react.svg)](https://badge.fury.io/js/translated-react) [![Build Status](https://travis-ci.org/miguelcalderon/translated-react.svg?branch=master)](https://travis-ci.org/miguelcalderon/translated-react) [![codecov](https://codecov.io/gh/miguelcalderon/translated-react/branch/master/graph/badge.svg)](https://codecov.io/gh/miguelcalderon/translated-react)



# translated-react - Translation management component for React

Component for managing and using simple translations in React.js. Easily implement i18n with this dependency free internationalization library, with a minimum footprint of 1,91 KB gzipped.

## Install

`npm install translated-react`

Or:

`yarn add translated-react`


## Basic Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import TranslatedProvider, { translated } from 'translated-react'
import PropTypes from 'prop-types'

const langTable = {
  en: {
    moreText: 'Some more text',
    textForTesting: 'Some text for testing with {nWords} words'
  },
  es: {
    moreText: 'Algo más de texto',
    textForTesting: 'Algo de texto de prueba con {nWords} palabras'
  }
}
const MyComponent = ({lookup: t}) => [t('textForTesting', { nWords: '8' }), t('moreText')]
MyComponent.propTypes = {
  lookup: PropTypes.func.isRequired
}
const MyTranslatedComponent = translated(MyComponent)
const MyApp = () => (
  <TranslatedProvider lang="es" defaultLang="en" langTable={langTable}>
    <MyTranslatedComponent />
  </TranslatedProvider>
)

ReactDOM.render(<MyApp />, document.getElementsByTagName('body')[0].appendChild(document.createElement('div')))
```

Currently only one TranslatedProvider component is supported; this means that, if you use two TranslatedProvider components only the last created one will have effect in setting the language, default language and translations table.

You can change the current language with the exported function `setLang(newLang)`. This will trigger rerendering of the TranslatedProvider component and its children with the new language (if it's different from the current one). 

Texts without vars are cached.


## Test

`npm test`

Or:

`yarn test`

<!--
## What's new

### 0.0.0

* .
-->

## License
*translated-react* is available under MIT. See LICENSE for more details.

