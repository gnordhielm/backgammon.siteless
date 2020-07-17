import React from 'react'
import moment from 'moment'

const FORMAT = 'H'

const THRESHOLDS = [
  {
    hour: 17,
    name: 'evening',
  },
  {
    hour: 12,
    name: 'afternoon',
  },
  {
    hour: 4,
    name: 'morning',
  },
  {
    hour: 0,
    name: 'evening',
  },
]

const getThresholdIndex = momentInstance => {
  const hour = parseInt(momentInstance.format(FORMAT))

  let thresholdIndex
  for (let i in THRESHOLDS) {
    thresholdIndex = i
    const threshold = THRESHOLDS[thresholdIndex]
    if (threshold.hour <= hour) break
  }

  return thresholdIndex
}

const getNextThresholdIndex = thresholdIndex =>
  thresholdIndex - 1 < 0 ? THRESHOLDS.length - 1 : thresholdIndex - 1

const getDelay = (momentInstance, hour) => {
  const to = moment(String(hour), FORMAT)
  let diff = to.diff(momentInstance)
  if (diff < 0) {
    to.add(1, 'day')
    diff = to.diff(momentInstance)
  }

  return diff
}

const useTimeOfDay = () => {
  const [thresholdIndex, setThresholdIndex] = React.useState(() =>
    getThresholdIndex(moment()),
  )

  React.useEffect(() => {
    const nextIndex = getNextThresholdIndex(thresholdIndex)
    const delay = getDelay(moment(), THRESHOLDS[nextIndex].hour)

    const timeout = setTimeout(() => {
      setThresholdIndex(nextIndex)
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  }, [thresholdIndex, setThresholdIndex])

  React.useEffect(() => {
    const handleWindowFocus = () => {
      setThresholdIndex(getThresholdIndex(moment()))
    }

    window.addEventListener('focus', handleWindowFocus)
    return () => {
      window.removeEventListener('focus', handleWindowFocus)
    }
  }, [])

  return THRESHOLDS[thresholdIndex].name
}

export default useTimeOfDay
