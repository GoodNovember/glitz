const { exec } = require('child_process')
const Path = require('path')
const fs = require('fs')

const run = ({
  command,
  ...options
}) => new Promise((resolve, reject) => {
  if (Object.keys(options).length > 0) {
    exec(command, { ...options }, (error, stdOut, stdErr) => {
      if (error) {
        reject(error)
      } else {
        resolve({ stdOut, stdErr })
      }
    })
  } else {
    exec(command, (error, stdOut, stdErr) => {
      if (error) {
        reject(error)
      } else {
        resolve({ stdOut, stdErr })
      }
    })
  }
})

const getGitVersion = () => run({ command: 'git --version' }).then(({ stdOut, stdErr }) => {
  if (stdErr) {
    return Promise.reject(stdErr)
  } else {
    return Promise.resolve(stdOut)
  }
})

const checkGitIsInstalled = () => new Promise((resolve, reject) => {
  run({ command: 'git --version' }).then(({ stdOut, stdErr }) => {
    if (stdOut) {
      resolve(true)
    }
    if (stdErr) {
      resolve(false)
    }
  }).catch(_error => {
    // we fail silently here.
    resolve(false)
  })
})

const generateGitLog = directory => new Promise((resolve, reject) => {
  run({
    command: 'git log --all --decorate --abbrev-commit --source',
    // command: 'git log --graph --all --decorate --source --name-only',
    cwd: directory
  }).then(({ stdOut, stdErr }) => {
    if (stdErr) {
      reject(stdErr)
    } else {
      resolve(stdOut)
    }
  })
})

const getGitStatus = directory => new Promise((resolve, reject) => {
  run({
    command: 'git status',
    cwd: directory
  }).then(({
    stdOut, stdErr
  }) => {
    if (stdErr) {
      reject(stdErr)
    } else {
      resolve(stdOut)
    }
  })
})

const getGitBranches = directory => new Promise((resolve, reject) => {
  run({
    command: 'git branch -a',
    cwd: directory
  }).then(({ stdOut, stdErr }) => {
    if (stdErr) {
      reject(stdErr)
    } else {
      resolve(stdOut)
    }
  })
})

const checkIfDirectoryIsGitRepo = directory => new Promise((resolve, reject) => {
  if (directory) {
    const potentialRepoPath = Path.join(directory, '.git')
    fs.access(potentialRepoPath, (error) => {
      if (error) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  } else {
    resolve(false)
  }
})

module.exports = {
  getGitVersion,
  checkGitIsInstalled,
  generateGitLog,
  getGitStatus,
  getGitBranches,
  checkIfDirectoryIsGitRepo
}
