'use client'
import React, { useState } from 'react'

// styles
import styles from './index.module.css'

// components
import Button from '@/shared/Button'
import Input from '@/shared/Input';

//react icons
import { IoClose } from "react-icons/io5";

//antd
import { Select } from 'antd';

//redux
import { useSelector } from 'react-redux';

//api
import { addNoteToStudent } from '@/api/data';

//toast
import toast from 'react-hot-toast';



const AddNotes = ({
    isOpenAdd,
    handleAddModal,
    availableStudents,
    getAllStudents
}) => {

    //redux states
    const { teacher } = useSelector(state => state.auth)
    const { _id, fieldOfEducation } = teacher

    //state
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [score, setScore] = useState(null)

    //select options
    const studentSelectOptions = availableStudents.map((student) => {
        return {
            value: student._id,
            label: student.fullname
        }
    })

    //handle select student
    const handleSelectStudent = (value) => {
        setSelectedStudent(value)
    }

    //handle add notes
    const handleAddNotes = async (e) => {
        try {
            e.preventDefault();
            await addNoteToStudent(selectedStudent, _id, fieldOfEducation, score);
            getAllStudents();
            toast.success('Note added successfully');
            handleAddModal();
        } catch (error) {
            toast.error('An error occurred while adding the note. Please try again.');
        }
    }

    return (
        <div className={
            styles.addStudentContainer + ' ' + (
                isOpenAdd ? styles.activeModal : styles.inactiveModal
            )
        }>

            <form className={styles.addStudentContent}>
                <div className={styles.addStudentHeader}>
                    <h1>Add Notes</h1>
                    <IoClose onClick={handleAddModal} />
                </div>
                <div className={styles.formGroup}>
                    <label>Select Student</label>
                    <Select
                        showSearch
                        style={{
                            width: '100%',
                            height: '40px'
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={studentSelectOptions}
                        onChange={handleSelectStudent}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Score</label>
                    <Input
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        placeholder="Enter Score"
                        type="number"
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        className={styles.addBtn}
                        onClick={handleAddNotes}
                    >
                        Add
                    </Button>
                    <Button
                        onClick={handleAddModal}
                        className={styles.cancelBtn}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddNotes