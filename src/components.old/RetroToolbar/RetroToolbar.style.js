import { css } from 'linaria'
import theme from 'style/theme'

export default css`
  margin: 0 0 20px;
  justify-content: space-between;
  display: flex;
  align-items: center;

  & > .__right,
  & > .__left {
    display: flex;
  }

  ._tracker {
    display: flex;
    height: 26px;
    align-items: center;
    justify-content: center;
    margin-right: 12px;

    & > .__divider {
      height: 1px;
      width: 12px;
      margin: 0 4px;
      background: ${theme.neutral800};
    }

    & > .__step {
      padding: 0 4px;
      color: ${theme.neutral500};

      &.--active {
        color: ${theme.neutral300};
      }
      &:first-of-type {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }

  ._toolbar-message,
  ._votes {
    display: flex;
    height: 26px;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
  }

  ._user-image {
    height: 24px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px 0 0 0;
    box-sizing: border-box;

    &:not(:last-child) {
      margin-right: 6px;
    }

    &.--owner {
      border-top: 1px solid transparent;
      border-color: ${theme.neutral600};
      color: ${theme.neutral500};
    }

    &.--current {
      border-color: ${theme.neutral0};
      color: ${theme.neutral0};
      margin-left: 16px;
    }

    & > .__image {
      margin-left: -1px;
      border: 1px solid ${theme.neutral900};
    }
    & > .__label {
      padding: 0 8px 0 4px;
    }
  }

  ._action {
    cursor: pointer;
    border-bottom: 1px solid ${theme.neutral800};
    color: ${theme.neutral500};

    &:not(:last-child) {
      margin-right: 14px;
    }

    &:hover {
      color: ${theme.neutral300};
      border-color: ${theme.neutral500};
    }
  }

  & > .__spacer {
    flex: 1;
  }
`
