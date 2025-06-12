import { useContext } from 'react';

/** Components **/
import { ConfigContext } from 'contexts/ConfigContext';

// ==============================|| HOOKS - CONFIG  ||============================== //

export default function useConfig() {
  return useContext(ConfigContext);
}
