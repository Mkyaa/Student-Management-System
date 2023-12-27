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

const DashLayout = ({ children }) => {

    //router
    const navigate = useRouter();

    //get teacher from localstorage
    const teacher = localStorage.getItem('teacher')

    //redirect to login if not logged in
    useEffect(() => {
        setTimeout(() => {
            if (!teacher) {
                navigate.push('/auth/login/teacher')
            }
        }, 2000)
    }, [teacher])

    return (
        teacher ?( 
       <div id="dashboard-container" className={styles.dashContainer}>
            <Navbar />
            <main id='main-container' className={styles.mainContainer}>
                {children}
            </main>
        </div>
        )
        :(
            <Loader text="Redirecting to the dashboard..." bg="#fbf7ff" color="#9747ff" />
        )
    )
}

export default DashLayout