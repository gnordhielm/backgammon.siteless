import { css } from 'linaria'
import theme from 'style/theme'

const tooltip = css`
  ._faded {
    color: ${theme.fadedText};
    font-size: 0.9rem;
  }
`

const base = css`
  display: flex;
  align-items: center;
  & > .__tooltip {
    display: inline-block;
    margin-left: 8px;
  }
`

export default { base, tooltip }
