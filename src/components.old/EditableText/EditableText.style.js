import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  cursor: text;
  border-bottom: 1px dotted ${theme.neutral700};
  padding: 0 1px;
  color: inherit;
  display: inline-flex;
  font-size: 1rem;

  &:hover,
  &:focus-within {
    color: ${theme.neutral300};
    border-color: ${theme.neutral500};
  }

  .input-container {
    width: 100%;
    font-size: inherit;
  }

  ._input {
    font-size: inherit;
    font-family: inherit;
    background: transparent;
    color: inherit;
    border: none;
    outline: none;
    padding: 0;
    width: 100%;
  }
`
