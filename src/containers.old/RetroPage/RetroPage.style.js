import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  ._message {
    height: 100%;
    flex: 1;
    min-height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.text};
  }
`
