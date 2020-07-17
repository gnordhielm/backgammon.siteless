import { css } from 'linaria'
import theme from 'style/theme'

const INPUT_HEIGHT = 34

const bar = css`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
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
      // padding: 20px 0 0;
    }

    & > .__cards {
      flex: 1;

      display: flex;
      flex-flow: column;
      position: relative;
      overflow: hidden;

      &.--action-items > .__list-container {
        margin-top: auto;
      }

      &:not(.--action-items) {
        margin-bottom: 30px;
        border-bottom: 1px solid ${theme.neutral800};
      }

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
    &::before {
      margin: 40px auto 8px;
      content: '';
      display: block;
      height: 1px;
      width: 10px;
      background: ${theme.neutral500};
    }
    margin: 0 auto 40px;
    font-size: 0.9rem;
    text-align: center;
    color: ${theme.fadedText};
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

  ._text-input,
  textarea {
    width: 100%;
    box-sizing: border-box;
  }

  ._text-input {
    margin: 0 0 24px;
  }

  textarea {
    outline: none;
    resize: none;
    background: ${theme.background};
    color: ${theme.text};
    border: 1px solid ${theme.neutral800};
    height: ${INPUT_HEIGHT}px;
    border-radius: 16px;
    padding: 8px 12px;
    font-size: 0.9rem;

    &:focus {
      height: 80px;
    }

    transition: height ease-out 200ms;
  }

  ._text-input.--action-input {
    textarea:focus {
      border-color: ${theme.actionColor};
    }
  }
`

export default { fill, bar }
