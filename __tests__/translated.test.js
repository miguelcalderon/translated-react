import React from 'react'
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils'
import ReactTestRenderer from 'react-test-renderer'
import TranslatedProvider, { translated } from '../src/translated'

describe('Translated', function () {
  it('should create provider component', function () {
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
    const MyComponent = {lookup:t} => (
      <div>{t('textForTesting')}</div>
    )
    const expectedRendered = ''
    const renderer = ReactTestRenderer.create(<MyApp />)
    console.log(renderer)
    expect(renderer).toEqual(expectedRendered)
  })
})
