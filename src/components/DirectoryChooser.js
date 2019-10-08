import React, { useState, useEffect } from 'react'
const { dialog } = require('electron').remote

export const DirectoryChooser = ({ onChange, initialValue }) => {
  const clickHandler = () => {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, ([directory]) => {
      if (directory !== undefined) {
        onChange(directory)
      }
    })
  }
  return (
    <button onClick={clickHandler}>Choose Directory</button>
  )
}
