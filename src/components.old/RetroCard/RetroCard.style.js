import { css } from 'linaria'
import { COLUMN_CLASS_NAMES, COLUMN_COLOR_MAP } from 'style'
import theme from 'style/theme'

const COLUMN_STYLES = Object.keys(COLUMN_CLASS_NAMES)
  .map(
    key =>
      `&.${COLUMN_CLASS_NAMES[key]} { 
        border-color: ${COLUMN_COLOR_MAP[key]};
    }`,
  )
  .join('\n')

const HOVER_COLUMN_STYLES = Object.keys(COLUMN_CLASS_NAMES)
  .map(
    key =>
      `&.--${COLUMN_CLASS_NAMES[key]}-hover { 
        border-color: ${COLUMN_COLOR_MAP[key]}; 
        border-left-style: dotted;
    }`,
  )
  .join('\n')

export default css`
  border-left: 1px solid transparent;
  font-size: 0.95rem;
  padding: 0 12px;
  color: ${theme.text};
  ${COLUMN_STYLES}

  &.--remove-hover {
    border-color: ${theme.neutral700};
    border-left-style: dotted;
  }

  ${HOVER_COLUMN_STYLES}

  &.--merge-hover, &.--merging, &.--move-hover,&.--edit-hover {
    border-left-style: dotted;
  }

  &.--merge-target {
    cursor: pointer;
    border: 1px solid ${theme.neutral800};
    border-radius: 16px;
    padding: 8px 12px;

    &:hover {
      border-color: ${theme.neutral500};
    }
  }

  &.--in-scope {
  }

  &.--out-of-scope {
    & > *:not(.__actions) {
      opacity: 0.55;
    }
  }

  p {
    margin: 0;
  }

  & > .__child-card {
    color: ${theme.neutral500};
    margin-top: 8px;
    margin-left: 8px;
  }

  & > .__actions {
    margin-top: 4px;
    & > .__action {
      user-select: none;
      font-size: 0.85rem;
      color: ${theme.neutral600};
      &:not(:last-child) {
        margin-right: 8px;
      }

      &:hover {
        cursor: pointer;
        color: ${theme.neutral300};
      }

      &.--disabled {
        pointer-events: none;
        color: ${theme.neutral800};
      }
    }
  }

  & > .__votes {
    margin-top: 4px;
    .__vote {
      display: inline-block;
      margin-right: 8px;
      height: 12px;
      width: 12px;
      border-radius: 50%;
      border: 1px solid ${theme.actionColor};

      &.--voting-user {
        background: ${theme.actionColor};
      }
    }
  }
`
