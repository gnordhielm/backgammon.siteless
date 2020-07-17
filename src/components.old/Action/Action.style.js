import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  user-select: none;
  cursor: pointer;
  border-bottom: 1px solid ${theme.neutral700};
  color: ${theme.text};
  outline: none;

  &:not(:last-child) {
    margin-right: 14px;
  }

  &.--standalone {
    margin-right: 0;
  }

  &.--faded {
    color: ${theme.fadedText};
    border-color: ${theme.neutral800};
  }

  &:hover {
    color: ${theme.neutral200};
    border-color: ${theme.neutral300};
  }
`
