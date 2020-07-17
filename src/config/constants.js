export const AUTHOR_LINK = "https://gus.siteless.co";

export const VERSION_HASH = process.env.REACT_APP_GIT_COMMIT_HASH;

export const PRODUCTION_HOST = "backgammon.siteless.co";

export const IS_PRODUCTION =
  process.env.NODE_ENV === "production" &&
  !process.env.REACT_APP_PRODUCTION_TRIP;
