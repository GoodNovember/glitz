import { useEffect, useState } from 'react'
import { checkIfDirectoryIsGitRepo } from '../utilities/gitLogic.js'
export const useDirectoryIsGitRepo = directory => {
  const [isGitRepo, setIsGitRepo] = useState(false)
  useEffect(() => {
    checkIfDirectoryIsGitRepo(directory).then(verdict => setIsGitRepo(verdict))
  }, [directory])
  return isGitRepo
}
