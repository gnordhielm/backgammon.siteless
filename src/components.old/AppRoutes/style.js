import { css } from 'linaria'

export const TRANSITION_DURATION = 200

export default css`
  & > .__transition-group {
    position: relative;
    height: 100vh;
    width: 100vw;

    & > .__route-switch {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;

      &.--fade-enter {
        opacity: 0.01;
      }

      &.--fade-enter.--fade-enter-active {
        opacity: 1;
        transition: opacity ${TRANSITION_DURATION}ms ease-out;
      }

      &.--fade-exit {
        opacity: 1;
      }

      &.--fade-exit.--fade-exit-active {
        opacity: 0.01;
        transition: opacity ${TRANSITION_DURATION}ms ease-out;
      }
    }
  }
`
