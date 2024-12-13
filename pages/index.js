import Head from 'next/head'
import { useState, useRef, useEffect, createRef } from 'react'
import toTitle from 'title'
import AutosizeInput from 'react-input-autosize'
import { MdContentCopy, MdDone } from 'react-icons/md'

const Index = () => {
  const [selectAll, setSelectAll] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selection, setSelection] = useState(null)
  const [isCopySuccess, setIsCopySuccess] = useState(false)
  const handler = useRef(null)

  useEffect(() => {
    setSelection({
      selectionStart: 0,
      selectionEnd: handler.current.input.value.length
    })
  }, [selectAll])

  useEffect(() => {
    if (selection) {
      const { selectionStart, selectionEnd } = selection
      handler.current.input.selectionStart = selectionStart
      handler.current.input.selectionEnd = selectionEnd
    }
  }, [selection, inputValue])

  useEffect(() => {
    handler.current.focus()
  }, [])

  const handleCopy = () => {
    // Perform the copy operation
    setIsCopySuccess(true)

    navigator.clipboard.writeText(inputValue)
    // Reset success message after a while (if needed)
    setTimeout(() => {
      setIsCopySuccess(false)
    }, 1000)
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
          Enter your title below to get it capitalized properly according to{' '}
          <a href="http://www.chicagomanualofstyle.org" target="_blank">
            The Chicago Manual of Style
          </a>
          :
        </p>

        <div className="input-div">
          <AutosizeInput
            type="text"
            placeholder="Paste or Enter Your Title"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            ref={handler}
            style={{ width: '100%' }}
            value={inputValue}
            onChange={(event) => {
              const { value, selectionStart, selectionEnd } = event.target
              setSelection({ selectionStart, selectionEnd })
              setInputValue(toTitle(value))
              setSelectAll(false)
            }}
            onPaste={(event) => {
              const { selectionStart, selectionEnd } = event.target
              if (
                selectionEnd === -1 ||
                (selectionStart === 0 && selectionEnd === inputValue.length)
              ) {
                setSelectAll(true)
              }
            }}
          />
          <button
            className={`copy-to-clip margin-left-sm js-copy-to-clip js-tooltip-trigger ${
              inputValue ? 'visible' : ''
            }`}
            type="button"
            data-success-title="Copied!"
            aria-controls="content-to-copy"
            tabIndex="0"
            onClick={handleCopy}
          >
            <svg
              className="icon icon--xs"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              color="#fff"
            >
              <path
                d="M12,2h.5A1.5,1.5,0,0,1,14,3.5v10A1.5,1.5,0,0,1,12.5,15h-9A1.5,1.5,0,0,1,2,13.5V3.5A1.5,1.5,0,0,1,3.5,2H4"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></path>
              <rect
                x="6"
                y="1"
                width="4"
                height="2"
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></rect>
              <polyline
                className={`copy-to-clip__icon-check ${
                  isCopySuccess ? 'active' : ''
                }`}
                points="5 9 7 11 11 7"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polyline>
            </svg>
            <span>Copy Title!</span>
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
        div.input-div {
          display: flex;
          align-items: center;
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
        button.copy-to-clip.margin-left-sm.js-copy-to-clip.js-tooltip-trigger {
          background: inherit;
          padding: 0px;
          border: none;
          visibility: hidden;
          opacity: 0;
          transition: visibility 0.2s, opacity 0.2s;
        }
        button.copy-to-clip.margin-left-sm.js-copy-to-clip.js-tooltip-trigger.visible {
          visibility: visible;
          margin-top: 5px;
          opacity: 1;
        }
        button.copy-to-clip span {
          display: none;
        }
        @keyframes drawCheckmark {
          0% {
            stroke-dashoffset: 12;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -12;
          }
        }
        .copy-to-clip__icon-check {
          stroke-dasharray: 12;
          stroke-dashoffset: 12;
          transition: opacity 0.5s ease-in-out;
        }
        .copy-to-clip__icon-check.active {
          animation: drawCheckmark 1.5s forwards;
          opacity: 1;
        }
        @media (min-width: 768px) {
          input {
            min-width: 300px;
            max-width: 620px;
          }
        }
        @media (max-width: 400px) {
          div.input-div {
            display: flex;
            flex-direction: column;
          }
          button.copy-to-clip.margin-left-sm.js-copy-to-clip.js-tooltip-trigger.visible {
            margin-top: 25px;
          }
          button.copy-to-clip.visible span {
            display: inline-block;
            color: #fff;
            margin-left: 7px;
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
      `}</style>
    </main>
  )
}

export default Index
