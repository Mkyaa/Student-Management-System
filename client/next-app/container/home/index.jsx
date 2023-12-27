'use client'
import React from 'react'

//styles
import styles from './index.module.css'

//hooks
import { useRouter } from 'next/navigation';

const HomeContainer = () => {

    //hooks
    const navigate = useRouter();

    //handle student login
    const handleStudentLogin = () => {
        navigate.push('/auth/login/student');
    }

    //handle teacher login
    const handleTeacherLogin = () => {
        navigate.push('/auth/login/teacher');
    }


  return (
    <div className={styles.homeContainer}>
        <div className={styles.studentLoginBox} onClick={handleStudentLogin}>
            <img src="/assets/images/student.svg" alt="Picture of the author"  />
            <h1>Student</h1>
        </div>
        <div className={styles.teacherLoginBox} onClick={handleTeacherLogin}>
            <img src="/assets/images/teacher.svg" alt="Picture of the author"  />
            <h1>Teacher</h1>
        </div>
    </div>
  )
}

export default HomeContainer