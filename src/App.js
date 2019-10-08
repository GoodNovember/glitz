import React, { useState } from 'react'
import { GitDetails } from './components/GitDetails.js'
import { DirectoryChooser } from './components/DirectoryChooser.js'

export const App = () => {
  const [ activeDirectory, updateActiveDirectory ] = useState('/Users/victor/dev/personal/clio')
  return (
    <div>
      <DirectoryChooser initialValue={activeDirectory} onChange={newDirectory => updateActiveDirectory(newDirectory)} />
      <GitDetails activeDirectory={activeDirectory} />
    </div>
  )
}
