import React, {  Component, PropTypes } from 'react'
import Code from './Code'

class CodeList extends Component {

  componentDidMount() {
    const { updateCodes, codelist} = this.props
    updateCodes()
  }

  render() {
    const { updateCodes, codelist} = this.props

    const codeNodes = 
      codelist.map(code => {
        return (
          <Code 
            cardName = { code.name }
            imgSrc = { code.image }
            key={ code.id  }/>
        )
    })

    return (
      <div>
        <br />
        <div>
          {codeNodes}
        </div>
      </div>
    )

  }
}

CodeList.propTypes = {
  updateCodes: PropTypes.func,
  codelist: PropTypes.array,
}

export default CodeList

