import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  cursor: pointer;
  position: relative;
  border: 1px solid ${theme.neutral800};
  padding: 1px 9px;
  border-radius: 16px;
  color: ${theme.neutral400};
  font-size: 0.95rem;
  display: inline-flex;
  outline: none;
  align-items: center;

  &.--faded {
    opacity: 0.5;
  }

  &:hover {
    color: ${theme.neutral300};
    border-color: ${theme.neutral500};
  }

  &.--loading,
  &.--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`
