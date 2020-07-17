import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  .-action-color {
    color: ${theme.actionColor};
  }

  & > .__body {
    border-top: 1px solid ${theme.neutral800};
    padding: 8px 0;
    cursor: pointer;

    &:hover {
      color: ${theme.neutral300};
      border-color: ${theme.neutral300};
    }

    & > .__title {
      margin-bottom: 6px;
    }

    & > .__details {
      font-size: 0.9rem;
      color: ${theme.fadedText};
      & > .__item {
        &:not(:last-child) {
          margin-bottom: 4px;
        }
      }
    }
  }

  & > .__footer {
    font-size: 0.85rem;
    text-align: right;
  }
`
