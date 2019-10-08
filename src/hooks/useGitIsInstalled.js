import { useEffect, useState } from 'react'
import { checkGitIsInstalled } from '../utilities/gitLogic.js'
export const useGitIsInstalled = () => {
  const [gitIsInstalled, setGitIsInstalled] = useState(false)
  useEffect(() => {
    checkGitIsInstalled().then(verdict => setGitIsInstalled(verdict))
  }, [])
  return gitIsInstalled
}
