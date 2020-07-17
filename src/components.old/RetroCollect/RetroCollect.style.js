import { css } from 'linaria'
import { COLUMN_CLASS_NAMES, COLUMN_COLOR_MAP } from 'style'
import theme from 'style/theme'

const INPUT_HEIGHT = 34

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
    flex: 1;
    padding: 0 10px;

    display: flex;
    flex-flow: column;

    & > .__title {
      flex: 0 0 auto;
      display: flex;
      justify-content: center;
      padding: 20px 0 0;
    }

    & > .__cards {
      flex: 1;

      display: flex;
      flex-flow: column;
      position: relative;
      overflow: hidden;

      & > .__list-container {
        margin-top: auto;
      }

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

  ._empty-message {
    font-size: 0.9rem;
    color: ${theme.fadedText};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    height: 100%;
  }

  ._move-message {
    font-size: 0.9rem;
    color: ${theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    margin: 8px 0;
    height: calc(100% - 16px);
    border: 1px solid ${theme.neutral800};
    border-radius: 16px;
    cursor: pointer;

    &:hover {
      border-color: ${theme.brightText};
      color: ${theme.brightText};
    }
  }

  ${Object.keys(COLUMN_CLASS_NAMES)
    .map(
      key =>
        `.${COLUMN_CLASS_NAMES[key]} ._move-message:hover { border-color: ${COLUMN_COLOR_MAP[key]}; }`,
    )
    .join('\n')}

  ._text-input,
  textarea {
    width: 100%;
    box-sizing: border-box;
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

  ._text-input {
    ${Object.keys(COLUMN_CLASS_NAMES)
      .map(
        key =>
          `&.${COLUMN_CLASS_NAMES[key]} textarea:focus { border-color: ${COLUMN_COLOR_MAP[key]}; }`,
      )
      .join('\n')}
  }

  ._text-input {
    margin: 0 0 24px;
  }
`

export default { fill, bar }
