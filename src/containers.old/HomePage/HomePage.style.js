import { css } from 'linaria'
import theme from 'style/theme'

const MARGIN = 24

export const createCurtainStyle = css`
  align-items: center;
  justify-content: center;

  & > .__input {
    margin: 36px 0;
    input {
      text-align: center;
    }
  }

  & > .__instructions {
    font-size: 0.9rem;
    color: ${theme.fadedText};
  }

  & > .__action {
    opacity: 0;
    transition: opacity 200ms ease-out;
    &.--visible {
      opacity: 1;
    }
  }
`

export default css`
  display: flex;

  & > .__body {
    padding: 24px 0 0;
    flex-flow: row wrap;
    align-items: flex-start;
    flex: 0 0 auto;
    margin: 0 -${MARGIN}px;

    & > .__item {
      flex: 0 0 auto;
      width: calc(25% - ${MARGIN * 2}px);
      margin: ${MARGIN}px;

      &.--create {
        padding: 8px 0;
        border-top: 1px solid ${theme.text};
        cursor: pointer;
        color: ${theme.text};
        min-height: 5rem;

        &:hover {
          color: ${theme.neutral200};
          border-color: ${theme.neutral300};
        }
      }
    }
  }
`
