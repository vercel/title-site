// Packages
import Head from 'next/head'
import { PureComponent } from 'react'
import toTitle from 'title'
import AutosizeInput from 'react-input-autosize'

class Index extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      replacingWithPaste: false,
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handlePaste = this.handlePaste.bind(this)
  }

  handleChange(event) {
    const { value } = event.target
    const input = this.handler.input
    const idx = input.selectionStart
    const { replacingWithPaste } = this.state
    const caretPosition = () => {
      if (replacingWithPaste) {
        input.selectionStart = 0
        input.selectionEnd = input.value.length
      } else {
        input.selectionStart = input.selectionEnd = idx
      }
    }
    
    this.setState({
      replacingWithPaste: false,
      value: toTitle(value)
    }, caretPosition)

    event.preventDefault()
  }
  
  handlePaste(event) {
    const { value, selectionStart, selectionEnd } = this.handler.input
    if (selectionStart !== 0 || selectionEnd !== value.length) {
      return
    }
    this.setState({ replacingWithPaste: true })
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
      onPaste: this.handlePaste,
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
          <title>Capitalize Your Title</title>

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

        <aside>
          <nav>
            <a href="https://github.com/zeit/title-site" target="_blank">Source</a>
            <b/>
            <a href="https://github.com/zeit/title" target="_blank">Module</a>
            <b/>
            <a href="https://zeit.co" target="_blank">Hosted on Now</a>
          </nav>
        </aside>

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
            flex-direction: column;
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
            padding: 50px 0 40px 0;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
          }

          aside nav {
            height: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          aside nav a {
            font-size: 13px;
            color: #b2b2b2;
            text-decoration: none;
            transition: color 100ms ease-in;
          }

          aside nav a:hover {
            color: #ff0080;
          }

          aside nav b {
            display: block;
            background: #b2b2b2;
            width: 1px;
            height: 100%;
            margin: 0 10px;
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

          @media (max-height: 400px) {
            aside {
              display: none;
            }
          }
        `}</style>
      </main>
    )
  }
}

export default Index
