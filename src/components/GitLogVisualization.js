import React from 'react'

const VisiCommit = ({ value: { commit, merge, author, date, message, refs } }) => {
  return (
    <div style={{
      padding: '.5rem 0'
    }}>
      <div>{date}</div>
      <div>{commit}{merge ? ` merges: ${merge}` : null}</div>
      <div>{author}</div>
      <div>{refs}</div>
      <div style={{
        padding: '0 1rem',
        whiteSpace: 'pre'
      }}>{message}</div>
    </div>
  )
}

export const GitLogVisualization = ({ log, isGenerating }) => {
  const lines = log.split('\n')
  const rawCommitGroups = lines.reduce((acc, line) => {
    if (line.indexOf('commit') === 0) {
      acc.push({
        commitRaw: line,
        lines: []
      })
    } else if (line.indexOf('Merge:') === 0) {
      if (acc[acc.length - 1]) {
        acc[acc.length - 1].mergeRaw = line
      }
    } else if (line.indexOf('Author:') === 0) {
      if (acc[acc.length - 1]) {
        acc[acc.length - 1].authorRaw = line
      }
    } else if (line.indexOf('Date:') === 0) {
      if (acc[acc.length - 1]) {
        acc[acc.length - 1].dateRaw = line
      }
    } else {
      if (acc[acc.length - 1]) {
        acc[acc.length - 1].lines.push(line)
      } else if (line.length !== 0) {
        console.log(line)
      }
    }
    return acc
  }, [])
  const rawData = rawCommitGroups.map(({ commitRaw, mergeRaw, lines, dateRaw, authorRaw }) => {
    const [
      ...logMessages
    ] = lines
    const commit = commitRaw.split('commit ')[1].split('\t')[0]
    const refs = commitRaw.split('commit ')[1].split(`\t`)[1]
    const author = authorRaw.split('Author: ')[1]
    const date = dateRaw.split('Date:   ')[1]
    const logLines = logMessages.reduce((acc, value) => {
      const trimmedValue = value.trim()
      if (trimmedValue.length !== 0) {
        acc.push(trimmedValue)
      }
      return acc
    }, [])
    const merge = mergeRaw ? mergeRaw.split('Merge: ')[1] : undefined
    const message = logLines.join('\n')
    return {
      commit,
      refs,
      author,
      date,
      merge,
      message
    }
  })
  const allCommits = rawData

  const renderable = allCommits.map(commit => {
    return <VisiCommit key={commit.commit} value={commit} />
  })

  const hasHistory = !!log

  if (isGenerating) {
    return (
      <div>Thinking...</div>
    )
  } else {
    if (hasHistory) {
      return (
        <div>{renderable}</div>
      )
    } else {
      return (
        <div>No commits in current repo.</div>
      )
    }
  }
}
