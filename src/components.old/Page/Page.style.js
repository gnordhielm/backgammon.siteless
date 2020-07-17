import { css } from 'linaria'

const root = css`
  height: 100%;
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  padding: 0 16px;
  width: 90vw;
  overflow: auto;
`
const bar = css`
  flex: 0 0 auto;
  &.--nudge {
    padding-left: 1rem;
  }
`

const fill = css`
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: flex;
  flex-flow: column;

  &.--nudge {
    padding-left: 1rem;
  }

  &.--center-vertical {
    justify-content: center;
  }

  &.--center-horizontal {
    align-items: center;
  }
`

export default {
  root,
  bar,
  fill,
}
