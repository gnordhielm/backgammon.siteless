import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
  background: ${theme.background};

  & > .__line-spinner {
    flex: 0 0 auto;
    width: 220px;
    text-align: center;
    position: relative;

    &:after {
      content: '';
      height: 3px;
      width: 9px;
      position: absolute;
      left: 0;
      background: ${theme.actionColor};
      animation: line 1s ease-in-out infinite;
    }
  }

  @keyframes line {
    0% {
      left: 0;
      box-shadow: 4px 0 3px rgba(${theme.actionColor}, 0);
    }
    25% {
      transform-origin: 0 0;
      transform: scaleX(2.85);
      box-shadow: 4px 0 3px rgba(${theme.actionColor}, 1);
    }
    50% {
      left: 95%;
      transform-origin: 0 0;
      transform: scaleX(1);
      box-shadow: -4px 0 3px rgba(${theme.actionColor}, 0);
    }
    75% {
      transform-origin: 0 0;
      transform: scaleX(2.85);
      box-shadow: -4px 0 3px rgba(${theme.actionColor}, 1);
    }
  }
`
