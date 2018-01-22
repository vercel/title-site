// Packages
import Head from 'next/head'
import { PureComponent } from 'react'
import convertTitle from '@zeit/title'
import AutosizeInput from 'react-input-autosize'

class Index extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { value } = event.target

    this.setState({
      value: convertTitle(value)
    })

    event.preventDefault()
  }

  componentDidMount() {
    if (!this.handler) {
      return
    }

    this.handler.input.focus()
  }

  render() {
    const { value } = this.state

    const settings = {
      type: 'text',
      value,
      onChange: this.handleChange,
      placeholder: 'Paste or Enter Your Title',
      autoComplete: 'off',
      autoCorrect: 'off',
      spellCheck: false,
      ref: item => this.handler = item,
      style: {
        width: '100%'
      }
    }

    return (
      <main>
        <Head>
          <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
        </Head>

        <section>
          <h1>Capitalize Your Title</h1>

          <p>Enter your title below to get it capitalized properly
          according to
          the <a href="http://www.chicagomanualofstyle.org" target="_blank">The Chicago Manual of Style</a>:</p>

          <AutosizeInput {...settings} />
        </section>

        <style jsx global>{`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
          }

          html,
          body {
            height: 100%;
          }

          body > div:first-child,
          body > div:first-child > div:first-child,
          body > div:first-child > div:first-child > div {
            height: inherit;
          }

          input {
            box-sizing: border-box;
            padding: 9.5px 15px;
            border: 0;
            text-align: center;
            border-bottom: 1px solid #d8d8d8;
            font-size: 14px;
            transition: border-bottom-color 100ms ease-in, color 100ms ease-in;
            max-width: 200px;
            border-radius: 0;
          }

          input:focus {
            outline: none;
            border-color: #000;
          }

          @media (min-width: 768px) {
            input {
              min-width: 300px;
              max-width: 620px;
            }
          }
        `}</style>

        <style jsx>{`
          main {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
          }

          section {
            text-align: center;
            max-width: 100%;
          }

          h1 {
            font-weight: normal;
            font-size: 24px;
            text-align: center;
            margin-bottom: 25px;
          }

          aside {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 50px;
          }

          p {
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            max-width: 390px;
            text-align: center;
            margin: 14px auto 30px auto;
          }

          a {
            text-decoration: none;
            color: #ff0080;
          }

          a:hover {
            text-decoration: underline;
          }
        `}</style>
      </main>
    )
  }
}

export default Index
