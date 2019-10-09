import { useEffect, useState } from 'react'
import { getGitStatus, checkIfDirectoryIsGitRepo } from '../utilities/gitLogic.js'
export const useGitStatusForDirectory = directory => {
  const [gitStatus, setGitStatus] = useState()
  useEffect(() => {
    checkIfDirectoryIsGitRepo().then(verdict => {
      if (verdict) {
        getGitStatus(directory).then(status => {
          setGitStatus(status)
        })
      }
    })
  }, [directory])
  return gitStatus
}
