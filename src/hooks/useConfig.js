import useDocument from 'hooks/useDocument'
import { CONFIG_VERSION } from 'config/constants'

const useConfig = () => {
  return useDocument('config/' + CONFIG_VERSION)
}

export default useConfig
