import React, { useEffect, useState } from 'react'

//styles 
import styles from './index.module.css'

//react icons
import { IoClose } from 'react-icons/io5'

//shared components
import Input from '@/shared/Input'
import Button from '@/shared/Button'

//redux
import { useSelector } from 'react-redux'

//api 
import { updateScoreForStudent } from '@/api/data'

//utils
import toast from 'react-hot-toast'

const UpdateNotes = ({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  handleUpdateModal,
  getAllStudents,
  studentToUpdate
}) => {

  //redux
  const { teacher } = useSelector(state => state.auth)

  //state
  const [updatedScore, setUpdatedScore] = useState(null);

  //update score when studentToUpdate changes
  useEffect(() => {
    setUpdatedScore(studentToUpdate.scores.find(score => score.teacherId === teacher._id).score)
  }, [studentToUpdate]);

  // update score function
  const updateScore = async (e) => {
    e.preventDefault();
    try {
      await updateScoreForStudent(studentToUpdate._id, teacher._id, teacher.fieldOfEducation, updatedScore)
      getAllStudents()
      toast.success('Score updated successfully')
      setIsUpdateModalOpen(false)
  }
    catch (err) {
      toast.error('Something went wrong')
    }
  }


  return (
    <div className={
      styles.updateNotesContainer + ' ' + (
        isUpdateModalOpen ? styles.activeModal : inactiveModal
      )}>

      <form className={styles.updateNotesBox}>
        <div className={styles.updateNotesHeader}>
          <h2>Update Score</h2>
          <IoClose onClick={handleUpdateModal} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="score">Full Name</label>
          <p>{studentToUpdate.fullname}</p>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="score">Score</label>
          <Input
            type="number"
            name="score"
            id="score"
            value={updatedScore}
            onChange={(e) => setUpdatedScore(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            className={styles.updateBtn}
            onClick={updateScore}
          >
            Update
          </Button>
          <Button
            type="button"
            className={styles.cancelBtn}
            onClick={handleUpdateModal}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateNotes