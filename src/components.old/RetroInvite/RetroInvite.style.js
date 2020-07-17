import { css } from 'linaria'
import theme from 'style/theme'

const base = css`
  ._icon {
    height: 16px;
    width: 16px;
    margin: 0 -5px;
    padding: 2px 0;
  }
`

const tooltip = css`
  text-align: right;
  & > .__instructions {
    font-size: 0.9rem;
    color: ${theme.fadedText};
  }
  & > .__link {
    font-size: 0.9rem;
    color: ${theme.brightText};
  }
`

export default { base, tooltip }
