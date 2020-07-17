import { css } from 'linaria'
import theme from 'style/theme'

const bar = css`
  display: flex;
  align-items: center;
  & > .__invite {
    margin-left: 8px;
  }
  & > .__spacer {
    flex: 1;
  }
  & > .__stage {
    font-size: 0.9rem;

    ._bright {
      color: ${theme.brightText};
    }
    ._faded {
      color: ${theme.fadedText};
    }
    ._action {
      color: ${theme.actionColor};
    }
  }
`

const fill = css`
  height: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-flow: row;
  justify-content: space-around;

  & > .__column {
    width: 300px;
    padding: 0 10px;

    display: flex;
    flex-flow: column;

    & > .__title {
      flex: 0 0 auto;
      display: flex;
      justify-content: center;
      // padding: 20px 0 0;
    }

    & > .__cards {
      flex: 1;

      display: flex;
      flex-flow: column;
      position: relative;
      overflow: hidden;
      margin-bottom: 30px;
      border-bottom: 1px solid ${theme.neutral800};

      ._card {
        margin-bottom: 18px;
      }

      ._indicator {
        height: 1px;
        width: 10px;
        margin: 0 auto;
      }
    }
  }
`
export default { fill, bar }
