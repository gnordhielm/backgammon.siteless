import { css } from 'linaria'
import COLORS from 'style/theme'
import theme from 'style/theme'

export default css`
  & > .__fill {
    justify-content: center;
    align-items: center;
    display: flex;
    & > .__items {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;

      & > .__item-wrapper {
        flex: 0 0 25%;

        & > .__content {
          border-top: 1px solid ${theme.neutral300};
          padding-top: 8px;
          margin: 12px;

          & > .__title {
            margin-bottom: 4px;
          }

          & > .__description {
            font-size: 0.9rem;
            color: ${COLORS.fadedText};
            margin-bottom: 12px;
          }

          & > .__actions {
            font-size: 0.9rem;
          }

          & > .__bar {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            margin-bottom: 12px;

            & > .__description {
              color: ${COLORS.fadedText};
              padding-right: 12px;
            }
          }
        }
      }
    }
  }
`
