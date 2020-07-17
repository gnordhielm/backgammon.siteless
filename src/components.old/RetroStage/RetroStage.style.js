import { css } from 'linaria'
import theme from 'style/theme'

const bar = css`
  display: flex;
  justify-content: flex-end;

  & > .__invite {
    margin-left: 8px;
  }
`

const fill = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-flow: column;

  ._instructions {
    font-size: 0.9rem;
    color: ${theme.fadedText};
    max-width: 200px;
    text-align: center;
  }
`
export default { bar, fill }
