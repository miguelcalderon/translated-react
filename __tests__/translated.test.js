import Enzyme from 'enzyme'
import React from 'react'
import TranslatedProvider, { translated } from '../src/translated'
import PropTypes from 'prop-types'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('Translated', function () {
  it('should create provider component', function () {
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
    const renderer = mount(<MyApp />)
    expect(renderer.html()).toBe('<div>Algo de texto de prueba con 8 palabrasAlgo más de texto</div>')
  })
})
