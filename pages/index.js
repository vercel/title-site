import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import toTitle from 'title'
import AutosizeInput from 'react-input-autosize'

const Index = () => {
  const [replacingWithPaste, setReplacingWithPaste] = useState(false)
  const [value, setValue] = useState('')
  const [copyStatus, setCopyStatus] = useState(false)
  const handler = useRef(null)

  const handleChange = (event) => {
    setValue(toTitle(event.target.value))
    setReplacingWithPaste(false)
    event.preventDefault()
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopyStatus(true)
      setTimeout(() => {
        setCopyStatus(false)
      }, 500)
    } catch (err) {
      setCopyStatus(false)
      console.error('Failed to copy: ', err)
    }
  }

  // Input caret position
  useEffect(() => {
    const input = handler.current.input
    input.selectionStart = 0
    input.selectionEnd = input.value.length
  }, [replacingWithPaste])

  const handlePaste = (event) => {
    const { value, selectionStart, selectionEnd } = handler.current.input
    if (selectionStart !== 0 || selectionEnd !== value.length) {
      return
    }
    setReplacingWithPaste(true)
  }

  useEffect(() => {
    handler && handler.current.input.focus()
  }, [handler])

  const settings = {
    type: 'text',
    value,
    onChange: handleChange,
    onPaste: handlePaste,
    placeholder: 'Paste or Enter Your Title',
    autoComplete: 'off',
    autoCorrect: 'off',
    spellCheck: false,
    ref: handler,
    style: {
      width: '100%'
    }
  }

  return (
    <main>
      <Head>
        <title>Capitalize Your Title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <h1>Capitalize Your Title</h1>

        <p>
          Enter your title below to get it capitalized properly according to the{' '}
          <a href="http://www.chicagomanualofstyle.org" target="_blank">
            The Chicago Manual of Style
          </a>
          :
        </p>

        <div>
          <AutosizeInput {...settings} />

          <button onClick={handleCopy} aria-label="Copy to Clipboard" title="Copy to Clipboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={`${copyStatus ? '#34d399' : '#000'}`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </section>

      <aside>
        <nav>
          <a href="https://github.com/vercel/title-site" target="_blank">
            Source
          </a>
          <b />
          <a href="https://github.com/vercel/title" target="_blank">
            Module
          </a>
          <b />
          <a href="https://vercel.com" target="_blank">
            Hosted on Vercel
          </a>
        </nav>
      </aside>

      <style jsx global>{`
        :root {
          supported-color-schemes: light dark;
        }
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
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
        @media (prefers-color-scheme: dark) {
          body {
            background: #1e1e1e;
            color: #fff;
          }
          input {
            background: #1e1e1e;
            border-color: #444;
            color: #fff;
          }
          input:focus {
            border-color: #fff;
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
        @media (prefers-color-scheme: dark) {
          aside nav b {
            background: #444;
          }
        }
        section > div {
          position: relative;
          display: flex;
          align-items: center;
        }
        button {
          background-color: transparent;
          border: none;
        }
      `}</style>
    </main>
  )
}

export default Index
