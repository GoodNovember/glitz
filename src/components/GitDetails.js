import React from 'react'
import { GitLogVisualization } from './GitLogVisualization.js'
import { useGitVersion } from '../hooks/useGitVersion.js'
import { useGitIsInstalled } from '../hooks/useGitIsInstalled.js'
import { useGitLogOutputForDirectory } from '../hooks/useGitLogOutputForDirectory.js'
import { useGitStatusForDirectory } from '../hooks/useGitStatusForDirectory.js'
import { useGitBranchesForDirectory } from '../hooks/useGitBranchesForDirectory.js'
import { useDirectoryIsGitRepo } from '../hooks/useDirectoryIsGitRepo.js'

export const GitDetails = ({ activeDirectory }) => {
  const gitVersion = useGitVersion()
  const gitIsInstalled = useGitIsInstalled()
  const isGitRepo = useDirectoryIsGitRepo(activeDirectory)
  // const gitStatus = useGitStatusForDirectory(activeDirectory)
  const branches = useGitBranchesForDirectory(activeDirectory)
  const [gitLogOutput, isGenerating] = useGitLogOutputForDirectory(activeDirectory)

  if (gitIsInstalled) {
    if (isGitRepo) {
      return (
        <div>
          <div>Git Version: <code>{ gitVersion }</code></div>
          <div>Directory: <code>{ activeDirectory }</code></div>
          <div>Active Branch: <code>{ branches.active }</code></div>
          {/* <pre>{ gitStatus }</pre> */}
          {/* <pre>Branches: {JSON.stringify(branches, null, '  ')}</pre> */}
          <GitLogVisualization log={gitLogOutput} isGenerating={isGenerating} />
        </div>
      )
    } else {
      return (
        <div>
          Hmm. It looks like <code>{activeDirectory}</code> is not a Git Repository.
        </div>
      )
    }
  } else {
    return (
      <div>Hmm. It looks like Git is not Installed on this system.</div>
    )
  }
}
