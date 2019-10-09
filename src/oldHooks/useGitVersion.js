import { useEffect, useState } from 'react'
import { getGitVersion } from '../utilities/gitLogic.js'
export const useGitVersion = () => {
  const [gitVersion, setGitVersion] = useState()
  useEffect(() => {
    getGitVersion().then((version) => setGitVersion(version))
  }, [])
  return gitVersion
}
