import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  border-left: 1px solid ${theme.actionColor};
  font-size: 0.95rem;
  padding: 0 10px;
  color: ${theme.text};

  &.--remove-hover {
    border-color: ${theme.neutral700};
    border-left-style: dotted;
  }

  &.--edit-hover {
    border-left-style: dotted;
  }

  p {
    margin: 0;
  }

  & > .__child-card {
    color: ${theme.neutral500};
    margin-top: 8px;
    margin-left: 8px;
  }

  & > .__actions {
    margin-top: 4px;
    & > .__action {
      user-select: none;
      font-size: 0.85rem;
      color: ${theme.neutral600};
      &:not(:last-child) {
        margin-right: 8px;
      }

      &:hover {
        cursor: pointer;
        color: ${theme.neutral300};
      }
    }
  }

  & > .__votes {
    margin-top: 4px;
    .__vote {
      display: inline-block;
      margin-right: 8px;
      height: 12px;
      width: 12px;
      border-radius: 50%;
      border: 1px solid ${theme.actionColor};

      &.--voting-user {
        background: ${theme.actionColor};
      }
    }
  }
`
