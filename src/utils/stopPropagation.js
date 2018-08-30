function isNativeEvent(event) {
  return Object.prototype.hasOwnProperty.call(event, 'nativeEvent')
}

export function stopPropagation(event) {
  event.stopPropagation()

  if (isNativeEvent(event)) {
    event.nativeEvent.stopImmediatePropagation()
  }
}
