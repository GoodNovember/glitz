import { useEffect, useState } from 'react'
import { getGitBranches, checkIfDirectoryIsGitRepo } from '../utilities/gitLogic.js'
export const useGitBranchesForDirectory = directory => {
  const [branches, setBranches] = useState({ active: null, all: [] })
  useEffect(() => {
    checkIfDirectoryIsGitRepo(directory).then(verdict => {
      if (verdict) {
        getGitBranches(directory).then(rawBranches => {
          if (rawBranches.length !== 0) {
            const branches = rawBranches.split('\n').map(item => {
              return item.trim()
            }).reduce((acc, item) => {
              if (item.length > 0) {
                if (item[0] === '*') {
                  const activeBranch = item.split('* ')[1]
                  acc.active = activeBranch
                  acc.local.push(activeBranch)
                  acc.list.push(activeBranch)
                } else if (item.indexOf('remotes/') === 0) {
                  acc.remote.push(item)
                  acc.list.push(item)
                } else {
                  acc.local.push(item)
                  acc.list.push(item)
                }
              }
              return acc
            }, {
              active: '',
              list: [],
              local: [],
              remote: []
            })
            setBranches(branches)
          } else {
            setBranches({
              active: '[No Branches Yet]',
              list: [],
              local: [],
              remote: []
            })
          }
        }).catch(error => {
          console.error(error)
        })
      }
    })
  }, [directory])
  return branches
}
