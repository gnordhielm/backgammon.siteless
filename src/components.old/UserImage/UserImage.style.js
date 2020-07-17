import { css } from 'linaria'
import COLORS from 'style/theme'

export default css`
  border-radius: 50%;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
  }

  &.--empty {
    color: ${COLORS.neutral700};
  }
`
