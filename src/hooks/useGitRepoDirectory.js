import { useEffect, useState } from 'react'
const NodeGit = require('nodegit')
export const useGitRepoDirectory = directory => {
  const [repo, setRepo] = useState([])
  const [isWorking, setIsWorking] = useState(false)
  const [errors, setErrors] = useState([])
  useEffect(() => {
    setIsWorking(true)
    setRepo([])
    setErrors([])
    NodeGit.Repository.open(directory).then(repo => {
      return repo.getMasterCommit()
    }).then(firstCommitOnMaster => {
      const history = firstCommitOnMaster.history()
      history.on('error', error => {
        setErrors((currentErrors) => {
          return [...currentErrors, error]
        })
      })
      history.on('end', commitListRaw => {
        const commitMap = new Map()
        const extractedCommitArray = commitListRaw.map(commitRaw => {
          const sha = commitRaw.sha()
          const author = {
            name: commitRaw.author().name(),
            email: commitRaw.author().email()
          }
          const message = commitRaw.message()
          const oid = commitRaw.id()
          const stringifiedOid = oid.toString()
          const parentOids = commitRaw.parents()
          const commitItem = {
            oid,
            stringifiedOid,
            sha,
            author,
            message,
            parentOids
          }
          commitMap.set(stringifiedOid, commitItem)
          return commitItem
        }).map(({ parentOids, ...items }) => {
          return {
            ...items,
            parentOids,
            parentOidStrings: parentOids.map(oid => {
              if (commitMap.has(oid.toString())) {
                return oid.toString()
              } else {
                return null
              }
            })
          }
        })
        setIsWorking(false)
        setRepo(extractedCommitArray)
      }) // end commit on end
      history.start()
    }).catch(error => {
      console.error(error)
      setErrors([error])
      setRepo([])
      setIsWorking(false)
    })
  }, [directory])

  return [repo, isWorking, errors]
}
