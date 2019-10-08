import { useEffect, useState } from 'react'
import { generateGitLog, checkIfDirectoryIsGitRepo } from '../utilities/gitLogic.js'
export const useGitLogOutputForDirectory = directory => {
  const [ log, setLog ] = useState('no log generated.')
  const [ isLoading, setIsLoading ] = useState(false)
  useEffect(() => {
    checkIfDirectoryIsGitRepo(directory).then(verdict => {
      if (verdict) {
        setLog('')
        setIsLoading(true)
        generateGitLog(directory).then(log => {
          setIsLoading(false)
          setLog(log)
        })
      }
    })
  }, [directory])
  return [log, isLoading]
}
