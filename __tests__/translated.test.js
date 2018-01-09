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
        textForTesting: 'Some text for testing'
      },
      es: {
        textForTesting: 'Algo de texto de prueba'
      }
    }
    const MyComponent = ({lookup: t}) => [t('textForTesting')]
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
    expect(renderer.html()).toBe('<div>Algo de texto de prueba</div>')
  })
})
