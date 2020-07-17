import {
  THEME_DATA_OPTIONS,
  THEME_DATA_TARGET,
  THEME_STORAGE_KEY,
} from 'config/theme'

const setTheme = (prefersLightMode = false) => {
  const theme = prefersLightMode
    ? THEME_DATA_OPTIONS.light
    : THEME_DATA_OPTIONS.dark

  document.documentElement.setAttribute(THEME_DATA_TARGET, theme)

  localStorage.setItem(THEME_STORAGE_KEY, prefersLightMode)
}

export default setTheme
