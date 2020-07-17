import React from 'react'
import moment from 'moment'

const RelativeTime = ({ value, fallback = '' }) => {
  const [now, setNow] = React.useState(() => Date.now())

  React.useLayoutEffect(() => {
    // TODO: update this based on the amount of time remaining
    const wait = 1000 * 60

    const updateNow = setTimeout(() => {
      setNow(() => Date.now())
    }, wait)

    return () => {
      clearInterval(updateNow)
    }
  }, [now, value])

  const display = React.useMemo(() => {
    if (!value) return fallback
    return moment.duration(value - now).humanize(true)
  }, [value, now, fallback])

  return display
}

export default RelativeTime
