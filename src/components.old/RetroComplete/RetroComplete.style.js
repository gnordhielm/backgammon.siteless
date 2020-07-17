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

  & > .__action {
    font-size: 0.9rem;
    & > .__finished-toggle {
      color: ${theme.actionColor};
      & > .__icon {
        font-size: 0.9rem;
        margin-right: 4px;
        vertical-align: text-top;
      }
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
    }

    & > .__cards {
      flex: 1;

      display: flex;
      flex-flow: column;
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid ${theme.neutral800};

      ._card {
        margin-bottom: 18px;
      }
    }
  }

  ._empty-message {
    font-size: 0.9rem;
    color: ${theme.fadedText};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    height: 100%;
  }

  ._item-divider {
    height: 1px;
    width: 10px;
    margin: 40px auto;
    background: ${theme.neutral500};
  }

  ._card-scroll-indicator {
    height: 1px;
    width: 10px;
    margin: 0 auto;
    background: ${theme.neutral500};

    &.--action-items {
      background: ${theme.actionColor};
    }
  }

  ._bottom-message {
    font-size: 0.9rem;
    color: ${theme.fadedText};
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default { fill, bar }
