import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  max-width: 600px;
  & > .__logo {
    margin: 24px auto;
    display: block;
  }

  & > .__copy {
    color: ${theme.text};
    padding-bottom: 96px;
  }
`
