import React from 'react'

//styles
import styles from './index.module.css'

const NotesList = ({ scores }) => {
    return (
        <div className={styles.notesListContainer}>
            <div className={styles.noteListContent}>
                <h1> NOTES </h1>
                {
                    scores.length > 0 ? (
                        scores.map((note, index) => {
                            return (
                                <div className={styles.noteContainer} key={index}>
                                    <h2> {note.subject.toUpperCase()} </h2>
                                    <p> {note.score} </p>
                                </div>
                            )
                        })
                    )
                        :
                        (
                            <div className={styles.noDataContainer}>
                                <img src="/assets/images/no-data.png" alt="no data" />
                                <p> You don't have a note yet </p>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default NotesList