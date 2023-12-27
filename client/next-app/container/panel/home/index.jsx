import React from 'react'

// styles
import styles from './index.module.css'

//utils
import { dashInfo } from '@/utils/dashInfo'

//components
import Bookmark from '@/components/panel/bookmark'
import PanelHeader from '@/components/panel/panelHeader'

//api
import { getStudents, getTeachers } from '@/api/data'


const PanelContainer = () => {

    //get all students and teachers for bookmarks 
    const allStudents = getStudents().length
    const allTeachers = getTeachers().length

    //dash bookmarks list 
    const dashBookmarks = dashInfo.map((dash, index) => {
        return <Bookmark
            key={index}
            dash={dash}
            allStudents={allStudents}
            allTeachers={allTeachers}
        />
    })

    return (
        <div className={styles.panelContainer}>
            <PanelHeader text="DASHBOARD" />
            {dashBookmarks}
        </div>
    )
}

export default PanelContainer