import React, { useState } from 'react'

// styles
import styles from './index.module.css'

//react icons
import { IoClose } from 'react-icons/io5'

//antd
import { Select } from 'antd'

//components
import Button from '@/shared/Button'

//utils 
import {studentSelectOptions} from '@/utils/options'

const Filters = ({
    isOpenFilter,
    handleFilterModal,
    sortData
}) => {

    //state
    const [filterTerm, setFilterTerm] = useState('')

    //handle change filter
    const handleChangeFilter = (value) => {
        setFilterTerm(value)
    }

    //handle filter 
    const handleFilter = () => {
        sortData(filterTerm)
        handleFilterModal()
    }

    return (
        <div className={
            styles.filtersContainer + ' ' +
            (isOpenFilter ? styles.activeModal : styles.inactiveModal)
        }>
            <form className={styles.filtersContent}>
                <div className={styles.filtersHeader}>
                    <h1>Filters</h1>
                    <IoClose onClick={handleFilterModal} />
                </div>
                <div className={styles.formGroup}>
                    <label>Sort</label>
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
                        onChange={handleChangeFilter}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        className={styles.addBtn}
                        onClick={handleFilter}
                    >
                        Add
                    </Button>
                    <Button
                        onClick={handleFilterModal}
                        className={styles.cancelBtn}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Filters