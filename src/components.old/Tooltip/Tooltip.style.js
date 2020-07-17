import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  background: ${theme.background};
  box-shadow: 0px 0px 4px 2px ${theme.background};
  border-radius: 16px;
  margin: 4px;
  padding: 4px 12px;
  color: ${theme.text};
  border: 1px solid ${theme.neutral800};

  & > .__arrow {
    background: ${theme.text};
    margin: 0 auto;
    width: 1px;
    height: 2px;
  }
`
