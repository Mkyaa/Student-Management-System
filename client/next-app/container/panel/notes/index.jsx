'use client'
import React, { useEffect, useState } from 'react'

//styles
import styles from './index.module.css'

//components
import Button from '@/shared/Button'
import StudentTable from '@/components/panel/studentTable'
import PanelHeader from '@/components/panel/panelHeader'

//redux
import { useSelector } from 'react-redux'

//api
import { getStudents } from '@/api/data'

//input
import Input from '@/shared/Input'

//icons
import { IoSearchOutline } from 'react-icons/io5'

const NotesContainer = () => {

    //redux
    const { teacher } = useSelector(state => state.auth)

    //STATES
    // add modal open close
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // students
    const [filteredStudents, setFilteredStudents] = useState([])
    const [availableStudents, setAvailableStudents] = useState([])
    // search
    const [searchTerm, setSearchTerm] = useState('');
    const [initialData, setInitialData] = useState([]);


    // get all students function
    const getAllStudents = async () => {
        const res = getStudents()
        const allData = await res
        setIsLoading(true)
        const filteredData = allData.filter((student) => {
            return student.scores.some((score) => {
                return score.teacherId === teacher._id
            })
        })
        const availableData = allData.filter((student) =>
            !filteredData.includes(student)
        )
        setFilteredStudents(filteredData)
        setInitialData(filteredData)
        setAvailableStudents(availableData)
        setIsLoading(false)
    }

    // get all students on page load
    useEffect(() => {
        getAllStudents()
    }
        , [])
        
    // SEARCH
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    //Search for students 
    useEffect(() => {
        const filteredData = initialData.filter((student) => {
            return student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.age.toString().includes(searchTerm) ||
                student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.scores.some((score) => {
                    return score.score.toString().includes(searchTerm)
                })
        })
        setFilteredStudents(filteredData)
    }, [searchTerm])

    // FILTER
    const sortData = (value) => {
        const filteredData = [...filteredStudents]
        switch (value) {
            case 'nameA-Z':
                filteredData.sort((a, b) => {
                    return a.fullname.localeCompare(b.fullname)
                })
                break;
            case 'nameZ-A':
                filteredData.sort((a, b) => {
                    return b.fullname.localeCompare(a.fullname)
                })
                break;
            case 'scoreLow-High':
                filteredData.sort((a, b) => {
                    return a.scores.find((score) => score.teacherId === teacher._id).score - b.scores.find((score) => score.teacherId === teacher._id).score
                })
                break;
            case 'scoreHigh-Low':
                filteredData.sort((a, b) => {
                    return b.scores.find((score) => score.teacherId === teacher._id).score - a.scores.find((score) => score.teacherId === teacher._id).score
                })
                break;
            default:
                break;
        }
        setFilteredStudents(filteredData)
    }

    // add modal open close
    const handleAddModal = () => {
        setIsOpenAdd(!isOpenAdd)
    }

    // filter modal open close
    const handleFilterModal = () => {
        setIsOpenFilter(!isOpenFilter)
    }

    return (
        <div className={styles.notesContainer}>
            <PanelHeader text={
                teacher.fieldOfEducation.toUpperCase() + " SCORES"
            } />

            {
                isLoading ?
                    <div className={styles.loading}>
                        <div className={styles.loadingBox}>
                            <div className={styles.loadingSpinner}>Load</div>
                        </div>
                    </div>
                    :
                    <div className={styles.notesContent}>
                        <div className={styles.actionContainer}>
                            <div className={styles.searchBox}>
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    onChange={handleSearch}
                                />
                                <IoSearchOutline />
                            </div>
                            <div className={styles.buttonContainer}>
                                <Button
                                    onClick={handleAddModal}
                                    className={styles.actionButton}
                                >
                                    +Add
                                </Button>
                                <Button
                                    onClick={handleFilterModal}
                                    className={styles.actionButton}
                                >
                                    Filter
                                </Button>
                            </div>
                        </div>
                        <div className={styles.tableContainer}>
                            <StudentTable
                                isOpenAdd={isOpenAdd}
                                isOpenFilter={isOpenFilter}
                                handleAddModal={handleAddModal}
                                sortData={sortData}
                                handleFilterModal={handleFilterModal}
                                availableStudents={availableStudents}
                                filteredStudents={filteredStudents}
                                getAllStudents={getAllStudents}
                            />
                        </div>
                    </div>
            }
        </div>
    )
}

export default NotesContainer