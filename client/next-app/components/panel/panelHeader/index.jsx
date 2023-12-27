import React from 'react'

// styles
import styles from './index.module.css'

const PanelHeader = ({text}) => {
  return (
    <div className={styles.panelHeader}>
        <h1>{text}</h1>
    </div>
  )
}

export default PanelHeader