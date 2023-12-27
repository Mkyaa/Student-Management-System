'use client'
import React, { useEffect } from 'react'

//styles
import styles from './index.module.css'

//redux
import { useSelector } from 'react-redux';

//components
import NotesList from '@/components/studentPanel/notesList';
import InfoSidebar from '@/components/studentPanel/infoSidebar';


const StudentPanelContainer = () => {

  //redux
  const { student } = useSelector(state => state.auth)

  //get scores from student object 
  const scores = student?.scores

  return (
    <div className={styles.studentPanelContainer}>
      <InfoSidebar student={student} />
      <NotesList scores={scores} />
    </div>
  )
}

export default StudentPanelContainer