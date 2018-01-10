import Enzyme from 'enzyme'
import React from 'react'
import TranslatedProvider, { translated } from '../src/translated'
import PropTypes from 'prop-types'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

const langTable = {
  en: {
    andMoreText: 'And some more text',
    moreText: 'Some more text',
    textForTesting: 'Some text for testing with {nWords} words'
  },
  es: {
    moreText: 'Algo más de texto',
    textForTesting: 'Algo de texto de prueba con {nWords} palabras'
  }
}

describe('Translated', function () {
  it('should create provider component and show translated text [es]', function () {
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
  it('should create provider component and show term (language not available)', function () {
    const MyComponent = ({lookup: t}) => [t('textForTesting', { nWords: '8' }), t('moreText')]
    MyComponent.propTypes = {
      lookup: PropTypes.func.isRequired
    }
    const MyTranslatedComponent = translated(MyComponent)
    const MyApp = () => (
      <TranslatedProvider lang="ru" defaultLang="fr" langTable={langTable}>
        <MyTranslatedComponent />
      </TranslatedProvider>
    )
    const renderer = mount(<MyApp />)
    expect(renderer.html()).toBe('<div>textForTestingmoreText</div>')
  })
  it('should create provider component and show translated text in default language (selected language not available)', function () {
    const MyComponent = ({lookup: t}) => [t('textForTesting', { nWords: '8' }), t('moreText')]
    MyComponent.propTypes = {
      lookup: PropTypes.func.isRequired
    }
    const MyTranslatedComponent = translated(MyComponent)
    const MyApp = () => (
      <TranslatedProvider lang="fr" defaultLang="en" langTable={langTable}>
        <MyTranslatedComponent />
      </TranslatedProvider>
    )
    const renderer = mount(<MyApp />)
    expect(renderer.html()).toBe('<div>Some text for testing with 8 wordsSome more text</div>')
  })
  it('should create provider component and show translated text [es], default language text for second term', function () {
    const MyComponent = ({lookup: t}) => [t('textForTesting', { nWords: '8' }), t('moreText'), t('andMoreText')]
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
    expect(renderer.html()).toBe('<div>Algo de texto de prueba con 8 palabrasAlgo más de textoAnd some more text</div>')
  })
  it('should create provider component and show translated text [es], and cached term', function () {
    const MyComponent = ({lookup: t}) => [t('textForTesting', { nWords: '8' }), t('moreText'), t('moreText')]
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
    expect(renderer.html()).toBe('<div>Algo de texto de prueba con 8 palabrasAlgo más de textoAlgo más de texto</div>')
  })
})
