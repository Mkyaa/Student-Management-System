import React, { useState } from 'react';

// styles
import styles from './index.module.css';

//react icons
import { FcEmptyTrash } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

//components
import AddNotes from '../addNotes';

//Toast
import toast from 'react-hot-toast';

//api
import { deleteScoreFromStudent } from '@/api/data';

//redux
import { useSelector } from 'react-redux';

//components
import UpdateNotes from '../updateScore';
import Filters from '../filters';


const StudentTable = ({
  isOpenAdd,
  isOpenFilter,
  sortData,
  handleAddModal,
  handleFilterModal,
  availableStudents,
  filteredStudents,
  getAllStudents
}) => {

  //redux
  const { teacher } = useSelector(state => state.auth)

  //state
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(8);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [studentToUpdate, setStudentToUpdate] = useState(null);


  // Get current students for pagination 
  const totalPage = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Eğer sayfadaki veri 8 satırdan azsa, eksik olan satırları boş olarak doldur.
  const emptyRows = studentsPerPage - currentStudents.length;
  const emptyRowElements = Array.from({ length: emptyRows }, (_, index) => (
    <tr className={styles.emptyRow} key={`empty-${index}`}>
      <td colSpan="5"></td>
    </tr>
  ));

  // update modal open close
  const handleUpdateModal = (student) => {
    setStudentToUpdate(student);
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  // handle add modal
  const handlePagination = (e) => {
    const { id } = e.target;
    if (id === "plus") {
      if (currentPage < totalPage) {
        setCurrentPage(currentPage + 1);
      }
    }
    if (id === "minus") {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // delete student note
const handleDeleteScore = async (studentId, teacherId) => {
  try {
    await deleteScoreFromStudent(studentId, teacherId);
    // Not silindiği için öğrenci listesini tekrar çağırma
    // Sayfa durumunu güncelle ve öğrenci listesini tekrar al
    const updatedFilteredStudents = filteredStudents.filter(student => student._id !== studentId);
    const updatedTotalPage = Math.ceil(updatedFilteredStudents.length / studentsPerPage);
    const updatedCurrentPage = Math.min(currentPage, updatedTotalPage);

    getAllStudents(); // Eğer gerçekten gerekliyse bu satırı kaldırabilirsiniz.
    toast.success('Score deleted successfully');

    // Sayfa durumunu güncelle
    setCurrentPage(updatedCurrentPage);

  } catch (error) {
    toast.error('An error occurred while deleting the score. Please try again.');
  }
};

  return (
    <div className={styles.studentTable}>
      
      {isOpenAdd && (
        <AddNotes
          isOpenAdd={isOpenAdd}
          handleAddModal={handleAddModal}
          availableStudents={availableStudents}
          getAllStudents={getAllStudents}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateNotes
          isUpdateModalOpen={isUpdateModalOpen}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
          handleUpdateModal={handleUpdateModal}
          getAllStudents={getAllStudents}
          studentToUpdate={studentToUpdate}
        />
      )}

      {
        isOpenFilter && (
          <Filters 
          isOpenFilter={isOpenFilter}
          handleFilterModal={handleFilterModal}
          sortData={sortData}
          />
        )
      }
        
      <table>
        <thead>
          <tr>
            <th>FullName</th>
            <th>Age</th>
            <th>Department</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            currentStudents.length > 0 ?
              currentStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.fullname}</td>
                  <td>{student.age}</td>
                  <td>{student.department}</td>
                  <td>{student.scores.find((score) => score.teacherId === teacher._id).score}</td>
                  <td>
                    <div className={styles.actionBox}>
                      <FcEmptyTrash
                        onClick={() => handleDeleteScore(student._id,
                          student.scores.find((score) => score.teacherId === teacher._id).teacherId)}
                      />
                      <CiEdit 
                      className={styles.editBtn} 
                      onClick={() => handleUpdateModal(student)} 
                      />
                    </div>
                  </td>
                </tr>
              ))
              : <tr className={styles.emptyRow}>
                <td colSpan="5" >No student found</td>
              </tr>
          }
          {emptyRowElements}
        </tbody>
      </table>

      <div>
        <div className={styles.pagination}>
          <span>Page {currentPage} of {
            totalPage === 0 ? 1 : totalPage
          }</span>
          <MdOutlineKeyboardArrowLeft id="minus" onClick={handlePagination} />
          <MdOutlineKeyboardArrowRight id="plus" onClick={handlePagination} />
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
