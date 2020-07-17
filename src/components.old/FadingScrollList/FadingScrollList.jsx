import React from 'react'
import createDetectElementResize from 'util/detectResize'

const FadingScrollList = React.memo(
  React.forwardRef(
    (
      {
        className,
        children,
        items,
        padding,
        maxBlur = 3,
        indicatorThreshold = 25,
        indicator = null,
        disableScrollLock = false,
      },
      ref,
    ) => {
      const containerRef = React.useRef(null)
      const indicatorRef = React.useRef(null)

      const setIndicator = React.useCallback(() => {
        if (!containerRef.current) return
        if (!indicatorRef.current) return

        if (containerRef.current.scrollTop > indicatorThreshold)
          indicatorRef.current.style.opacity = 1
        else indicatorRef.current.style.opacity = 0
      }, [indicatorThreshold])

      const childrenRef = React.useRef({})
      const makeHandleChildRef = React.useCallback(
        key => element => {
          childrenRef.current[key] = element
        },
        [],
      )

      const isScrollLockedRef = React.useRef(false)

      const scrollToBottom = React.useCallback(element => {
        if (!isScrollLockedRef.current) return
        if (!element) return

        // element.scrollTop = element.scrollHeight
        element.scroll({
          top: element.scrollHeight,
          behavior: 'smooth',
        })
      }, [])

      React.useEffect(() => {
        if (!isScrollLockedRef.current) return
        const element = containerRef.current
        if (!element) return
        scrollToBottom(element)
      }, [items, scrollToBottom])

      const requestLockScrollToBottom = React.useCallback(() => {
        if (disableScrollLock) return

        isScrollLockedRef.current = true

        const element = containerRef.current
        if (element) scrollToBottom(element)
      }, [scrollToBottom, disableScrollLock])

      React.useImperativeHandle(
        ref,
        () => ({
          requestLockScrollToBottom,
        }),
        [requestLockScrollToBottom],
      )

      const handleResize = React.useCallback(() => {
        if (!isScrollLockedRef.current) return
        scrollToBottom(containerRef.current)
      }, [scrollToBottom])

      React.useLayoutEffect(() => {
        const detector = createDetectElementResize(Math.random())
        detector.addResizeListener(
          containerRef.current.parentElement,
          handleResize,
        )

        return () => {
          detector.removeResizeListener(
            containerRef.current.parentElement,
            handleResize,
          )
        }
      }, [handleResize])

      const handleScroll = React.useCallback(
        event => {
          const { scrollTop, scrollHeight, offsetHeight } = event.target

          setIndicator()

          if (!disableScrollLock)
            isScrollLockedRef.current =
              scrollTop + 300 >= scrollHeight - offsetHeight

          for (let key in childrenRef.current) {
            const element = childrenRef.current[key]
            if (!element) continue

            const topDistance = element.offsetTop - scrollTop
            const animationProgress = (padding - topDistance) / padding

            if (animationProgress <= 0) {
              element.style.opacity = 1
              element.style.filter = ''
              element.style.pointerEvents = ''
            } else if (animationProgress >= 1) {
              element.style.pointerEvents = 'none'
              element.style.opacity = 0
              element.style.filter = ''
            } else {
              element.style.pointerEvents = 'none'
              window.requestAnimationFrame(() => {
                element.style.opacity = 1 - animationProgress
                element.style.filter = `blur(${animationProgress * maxBlur}px)`
              })
            }
          }
        },
        [maxBlur, padding, setIndicator, disableScrollLock],
      )

      return (
        <div
          className={className}
          style={{
            overflow: 'auto',
            padding: `${padding}px ${maxBlur * 2}px 0`,
          }}
          onScroll={handleScroll}
          ref={element => {
            containerRef.current = element
            setIndicator()
          }}
        >
          <div
            ref={element => {
              indicatorRef.current = element
              setIndicator()
            }}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
            }}
          >
            {indicator}
          </div>
          {items.map(item => (
            <div
              key={item.key}
              // TODO: handle clearing children when they're removed
              ref={makeHandleChildRef(item.key)}
            >
              {children({ item })}
            </div>
          ))}
        </div>
      )
    },
  ),
)

FadingScrollList.displayName = 'FadingScrollList'

export default FadingScrollList
