import { css } from 'linaria'
import theme from 'style/theme'

const ANIMATE_OFFSET = 50

export default {
  content: css`
    outline: none;
    width: 100vw;
    height: 100vh;

    & > .__page {
      overflow: hidden;

      & > .__bar {
        margin: 20px 0;
        text-align: right;
        z-index: 8;
      }
      & > .__fill {
        .ReactModal__Overlay & {
          left: 0;
          position: relative;
          top: ${ANIMATE_OFFSET}px;
          border-top: ${ANIMATE_OFFSET}px solid ${theme.background};
          height: calc(100% + ${ANIMATE_OFFSET}px);
          margin: -${ANIMATE_OFFSET}px 0 0;
          overflow: hidden;
          transition: top 200ms ease-out;
        }

        .ReactModal__Overlay--after-open & {
          top: 0;
          transition: top 250ms ease-out;
        }

        .ReactModal__Overlay--before-close & {
          top: ${ANIMATE_OFFSET}px;
        }
      }
    }
  `,

  overlay: css`
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: ${theme.background};
    z-index: 7;

    &.ReactModal__Overlay {
      opacity: 0;
      transition: opacity 300ms ease-out 50ms;
    }

    &.ReactModal__Overlay--after-open {
      opacity: 1;
      transition: opacity 200ms ease-out;
    }

    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  `,
}
