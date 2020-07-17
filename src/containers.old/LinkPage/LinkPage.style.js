import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  ._bright {
    color: ${theme.brightText};
  }
  & > .__fill {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
