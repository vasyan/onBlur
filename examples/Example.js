import React from 'react'

import './example.scss'
import { BlurrableWrapper } from '../src/index'

const TIPS = [
  `This pane doesn't close on inner clicks`,
  `SUCH CLICKS`,
  `MUCH BLUR`,
  `WOW`,
  `SO CLOSE`,
  `CLICK OUTSIDE PLS`,
]

const Tip = (tip, index) => (
  <p className={`tip tip-${index}`} key={index}>
    {tip}
  </p>
)

class Example extends React.Component {
  state = {
    isOpen: false,
    innerClicks: 0,
  }

  originRef = React.createRef()

  render() {
    const { isOpen } = this.state

    return (
      <div className="wrapper">
        <div className="title-wrapper">
          <p>Try to open this pane by click button</p>
          <button
            className="open-pane-button"
            onClick={this.handleTogglePane}
            type="button"
          >
            {isOpen ? 'Close' : 'Open'}
          </button>
        </div>
        {isOpen ? (
          <BlurrableWrapper onBlur={this.handleBlur}>
            <div
              className="pane"
              onClick={this.handlePaneClick}
              ref={this.originRef}
            >
              <p>Click outside to close</p>
              <div className="img-wrapper-round">
                <img
                  className="doge-img"
                  src="http://i0.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg"
                />
              </div>
              {this.renderTips()}
            </div>
          </BlurrableWrapper>
        ) : null}
      </div>
    )
  }

  renderTips() {
    return TIPS.filter((tip, index) => index < this.state.innerClicks).map(Tip)
  }

  handleTogglePane = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      innerClicks: 0,
    })
  }

  handlePaneClick = () => {
    this.setState({
      innerClicks: this.state.innerClicks + 1,
    })
  }

  handleBlur = () => {
    this.setState({
      isOpen: false,
      innerClicks: 0,
    })
  }
}

export default Example
