import Enzyme from 'enzyme'
import React, { Component } from 'react'
import TranslatedProvider, { translated, setLang } from '../src/index'
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
    expect.assertions(1)
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
  it('should create provider component and show term (languages not available)', function () {
    expect.assertions(1)
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
  it('should create provider component and show translated text and term (default language not available)', function () {
    expect.assertions(1)
    const MyComponent = ({lookup: t}) => [t('textForTesting', { nWords: '8' }), t('someMoreText')]
    MyComponent.propTypes = {
      lookup: PropTypes.func.isRequired
    }
    const MyTranslatedComponent = translated(MyComponent)
    const MyApp = () => (
      <TranslatedProvider lang="es" defaultLang="fr" langTable={langTable}>
        <MyTranslatedComponent />
      </TranslatedProvider>
    )
    const renderer = mount(<MyApp />)
    expect(renderer.html()).toBe('<div>Algo de texto de prueba con 8 palabrassomeMoreText</div>')
  })
  it('should create provider component and show translated text and term (not available in default language)', function () {
    expect.assertions(1)
    const MyComponent = ({lookup: t}) => [t('textForTesting', { nWords: '8' }), t('anyMoreText')]
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
    expect(renderer.html()).toBe('<div>Algo de texto de prueba con 8 palabrasanyMoreText</div>')
  })
  it('should create provider component and show term (first term default language, second term not available in any language)', function () {
    expect.assertions(1)
    const MyComponent = ({lookup: t}) => [t('textForTesting', { nWords: '8' }), t('anyMoreText')]
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
    expect(renderer.html()).toBe('<div>Some text for testing with 8 wordsanyMoreText</div>')
  })
  it('should create provider component and show translated text in default language (selected language not available)', function () {
    expect.assertions(1)
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
    expect.assertions(1)
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
    expect.assertions(1)
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
  it('should create provider component and show translated text [es], then after setting new language show translated text [en]', function () {
    expect.assertions(2)
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
    setLang('en')
    expect(renderer.html()).toBe('<div>Some text for testing with 8 wordsSome more text</div>')
  })
  it('should create provider component and show translated text [es], then after setting new language show translated text [en], then again in [en], then remove translated component', function () {
    expect.assertions(4)
    const MyComponent = ({lookup: t}) => [t('textForTesting', { nWords: '8' }), t('moreText')]
    MyComponent.propTypes = {
      lookup: PropTypes.func.isRequired
    }
    const MyTranslatedComponent = translated(MyComponent)
    class MyApp extends Component {
      constructor () {
        super()
        this.state = { flag: true }
      }
      render () {
        return (
          this.state.flag === true &&
            <TranslatedProvider lang="es" defaultLang="en" langTable={langTable}>
              <MyTranslatedComponent />
            </TranslatedProvider>
        )
      }
    }
    const renderer = mount(<MyApp />)
    expect(renderer.html()).toBe('<div>Algo de texto de prueba con 8 palabrasAlgo más de texto</div>')
    setLang('en')
    expect(renderer.html()).toBe('<div>Some text for testing with 8 wordsSome more text</div>')
    setLang('en')
    expect(renderer.html()).toBe('<div>Some text for testing with 8 wordsSome more text</div>')
    renderer.setState({ flag: false })
    expect(renderer.html()).toBe(null)
  })
})
