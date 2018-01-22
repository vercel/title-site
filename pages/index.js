// Packages
import { PureComponent } from 'react'
import convertTitle from '@zeit/title'

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

  render() {
    const { value } = this.state

    const settings = {
      type: 'text',
      value,
      onChange: this.handleChange,
      placeholder: 'Paste or Enter Your Title',
      autoComplete: 'off',
      spellCheck: false
    }

    return (
      <main>
        <input {...settings} />
      </main>
    )
  }
}

export default Index
