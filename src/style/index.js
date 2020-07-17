import {
  css
} from 'linaria'
import theme from './theme'

export default css `
  :global() {
    html {
      font-size: 87.5%;
      height: 100%;
      /* stops body scroll feedback on chrome */
      overflow: hidden;
    }

    body {
      color: ${theme.text};
      background: ${theme.background};
      font-family: ${theme.bodyFont};
      line-height: 1.6;
      height: 100%;
      padding: 0;
      margin: 0;
    }

    div#root {
      height: 100%;
    }
  }
`
