import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  font-size: 24px;
  font-weight: 100;
  letter-spacing: 1px;
  padding: 6px;
  color: ${theme.neutral0};
  display: inline-flex;
  align-items: center;

  & > .__image {
    height: 28px;
    width: 28px;
  }
`
