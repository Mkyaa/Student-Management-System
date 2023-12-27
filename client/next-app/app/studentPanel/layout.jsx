'use client'
import React, { useEffect } from 'react'

//components
import Navbar from '@/components/panel/navbar'

//styles
import styles from './page.module.css'

//hooks
import { useRouter } from 'next/navigation'

//loader
import Loader from '@/components/loader'
import StudentPanelHeader from '@/components/studentPanel/header'

const StudentPanelLayout = ({ children }) => {

    const navigate = useRouter();

    const student = localStorage.getItem('student')
  
    useEffect(() => {
        setTimeout(() => {
            if (!student) {
                navigate.push('/auth/login/student')
            }
        }, 2000)
    }, [student])

    return (
        student ?( 
        <div className={styles.studentPanelContainer}>
             <StudentPanelHeader />
            <main id='main-container' className={styles.mainContainer}>
                {children}
            </main>
        </div>
    )
    :(
        <Loader text="Redirecting to the login page..." bg="#eff6ff" color="#3b82f6" />
        )
    )
}

export default StudentPanelLayout