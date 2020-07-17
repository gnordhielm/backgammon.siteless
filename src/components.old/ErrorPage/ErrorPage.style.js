import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  max-width: 600px;
  justify-content: center;

  & > .__error {
    border-top: ${theme.border};
    color: ${theme.neutral700};
    padding: 8px 0;
    margin-top: 48px;
  }
`
