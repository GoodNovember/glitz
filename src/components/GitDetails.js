import React from 'react'
import { useGitRepoDirectory } from '../hooks/useGitRepoDirectory'

export const GitDetails = ({ activeDirectory }) => {
  const [repo, isWorking, errors] = useGitRepoDirectory(activeDirectory)

  const formattedErrors = errors.map((error, index) => {
    const errID = `${index} ${error.toString()}`
    return (
      <div key={errID}>{error.toString()}</div>
    )
  })

  return (
    <div>
      <div>{ formattedErrors }</div>
      {isWorking ? `Building Git Commit Map for: ${activeDirectory}` : null}
      <pre>{repo.length > 0 ? JSON.stringify(repo, null, '  ') : null}</pre>
    </div>
  )
}
