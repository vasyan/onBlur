import React from 'react'
import { debounce, stopPropagation } from '../utils'
import PropTypes from 'prop-types'

const isMobileDevice = false

const DEBOUNCE_TIMEOUT = 150

export class BlurrableWrapper extends React.Component {
  hasActiveListeners = false
  refNode = React.createRef()

  componentDidMount() {
    const { children, disabled, onBlur } = this.props

    if (children && children.ref) {
      this.refNode = children.ref
    }

    if (!disabled && onBlur) {
      this.listenEvents()
    }
  }

  componentWillUnmount() {
    this.stopListenEvents()
  }

  listenEvents = () => {
    document.addEventListener('click', this.handleDocumentClick, false)

    if (isMobileDevice) {
      document.addEventListener('touch-start', this.handleDocumentClick, false)
    }

    this.hasActiveListeners = true
  }

  stopListenEvents() {
    if (!this.hasActiveListeners) {
      return
    }

    document.removeEventListener('click', this.handleDocumentClick, false)

    if (isMobileDevice) {
      document.removeEventListener(
        'touch-start',
        this.handleDocumentClick,
        false
      )
    }
  }

  render() {
    if (!this.props.children) {
      return null
    }

    return React.cloneElement(this.props.children, {
      ref: this.props.children.ref || this.refNode,
    })
  }

  handleBlur = debounce(event => {
    this.props.onBlur(event)
  }, DEBOUNCE_TIMEOUT)

  handleDocumentClick = event => {
    if (this.props.disabled || this.refNode.current.contains(event.target)) {
      return
    }

    if (isMobileDevice) {
      stopPropagation(event)

      event.preventDefault()
    }

    this.handleBlur(event)
  }
}

BlurrableWrapper.propTypes = {
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  children: PropTypes.any,
}

// export const BlurrableEnchancer = Component => ({
//   onBlur,
//   disabled,
//   ...otherProps
// }) => (
//   <BlurrableWrapper onBlur={onBlur} disabled={disabled}>
//     <Component {...otherProps} />
//   </BlurrableWrapper>
// )
