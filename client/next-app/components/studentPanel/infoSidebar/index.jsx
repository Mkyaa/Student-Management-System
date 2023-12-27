import React from 'react'

//styles
import styles from './index.module.css'

const InfoSidebar = ({student}) => {

    //destructure student
    const {studentNumber, fullname, age, department} = student

  return (
    <div className={styles.infoSidebarContainer}>
        <div className={styles.infoSidebarContent}>
            <h1> STUDENT INFO </h1>
            <div className={styles.infoContainer}>
                <img src="/assets/images/profile.svg" alt="profile" />
                <div className={styles.info}>
                    <h3>Student Number</h3>
                    <p>{studentNumber}</p>
                </div>
                <div className={styles.info}>
                    <h3>Full Name</h3>
                    <p>{fullname}</p>
                </div>
                <div className={styles.info}>
                    <h3>Age</h3>
                    <p>{age}</p>
                </div>
                <div className={styles.info}>
                    <h3>Department</h3>
                    <p>{department}</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default InfoSidebar