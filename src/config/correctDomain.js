import { IS_PRODUCTION, PRODUCTION_HOST } from './constants'

// because this deployment is spread over so many goddamn domains, in production
// I'd like to bring instances of this app on other domains to the one I want to
// support (i.e. not firebase created domains).

const correctDomain = () => {
  if (!IS_PRODUCTION) return
  if (window.location.host !== PRODUCTION_HOST)
    window.location.replace(
      `https://${PRODUCTION_HOST}${window.location.pathname}`,
    )
}

export default correctDomain
