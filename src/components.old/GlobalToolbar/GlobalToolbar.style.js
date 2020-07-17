import { css } from 'linaria'
import theme from 'style/theme'

const ANIMATE_OFFSET = 50

const curtain = css`
  display: flex;
  flex-flow: column;
  flex: 1;
  & > .__main {
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    & > .__action {
      margin-bottom: 16px;
    }
  }

  & > .__footer {
    flex: 0 0 auto;
    text-align: center;
    color: ${theme.neutral700};
    padding: 12px;
    font-size: 0.85rem;

    & > .__divider {
      margin: 0 8px;
    }
  }
`

const base = css`
  margin: 20px 0;
  justify-content: space-between;
  display: flex;
  align-items: center;
  ._action {
    user-select: none;
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

  & > .__title {
    color: ${theme.neutral300};
    flex: 1;
    &.--centered {
      text-align: center;
    }
  }

  & > .__right {
    flex: 1;
    text-align: right;
  }

  & > .__left {
    flex: 1;
    text-align: left;
  }

  & > .__menu {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: ${ANIMATE_OFFSET}px;
    left: 0;
    height: calc(100vh + ${ANIMATE_OFFSET}px);
    width: 100vw;
    border-top: ${ANIMATE_OFFSET}px solid ${theme.background};
    margin: -${ANIMATE_OFFSET}px 0 0;
    overflow: hidden;
    background: ${theme.background};
    opacity: 0;
    z-index: -1;
    transition: opacity 300ms ease-out 50ms, top 200ms ease-out,
      z-index 0ms linear 401ms;
  }
`

export default { base, curtain }
