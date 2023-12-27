'use client'
import React, { useEffect } from 'react'

// styles
import styles from './index.module.css'

// components
import Button from '@/shared/Button'
import Input from '@/shared/Input'

//formik
import { Formik } from 'formik'
import * as Yup from 'yup'

//hooks
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

//toaster for notifications
import toast from 'react-hot-toast'

//redux
import { setStudent } from '@/redux/app/auth/authSlice'

//loader
import Loader from '@/components/loader'

//login
import { loginStudent } from '@/api/auth'


//validation schema
const userSchema = Yup.object().shape({
  studentNumber: Yup.string().required('Student number is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const StudentLoginContainer = () => {

  //redux
  const { student } = useSelector(state => state.auth);
  
  //hooks
  const dispatch = useDispatch();
  const navigate = useRouter();

  // handle form submit for student login
  const handleFormSubmit = async (values, setSubmitting) => {
    try {
      const res = await loginStudent(values.studentNumber, values.password);
      const { student } = res;

      if (student) {
        localStorage.setItem('student', JSON.stringify(student));
        dispatch(setStudent(student));
        navigate.push('/studentPanel');
        toast.success(`Welcome back, student ${student.fullname}!`);
      } else {
        toast.error('Login failed. Please check your student number and password and try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred during login');
    } finally {
      setSubmitting(false);
    }
  };

  // redirect to student panel if student is logged in
  useEffect(() => {
    setTimeout(() => {
      if (student) {
        navigate.push('/studentPanel');
      }
    }, 3000);
  }, [student]);


  return (
    student ? (
      <Loader text="Redirecting to the dashboard..." bg="#eff6ff" color="#3b82f6" /> 
    )
      :
      (
        <div className={styles.loginContainer}>
          <Formik
            initialValues={{
              studentNumber: '',
              password: '',
            }}
            validationSchema={userSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleFormSubmit(values, setSubmitting);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
            }) => (
              <form className={styles.signForm} onSubmit={handleSubmit}>
                <h1 className={styles.signLogo}>MANAGE STUDENT</h1>
                <h2 className={styles.signTitle}>SIGN IN</h2>
                <span className={styles.signSubtitle}>Enter your credentials to access your account</span>
                <div className={styles.signInputContainer}>
                  <article className={styles.signErrBox}>
                    <label htmlFor="studentNumber">Student Number</label>
                    {errors.studentNumber && touched.studentNumber && <small>*{errors.studentNumber}</small>}
                  </article>
                  <Input
                    id="studentNumber"
                    type="text"
                    placeholder="Enter your student number"
                    name="studentNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.studentNumber}
                  />
                </div>
                <div className={styles.signInputContainer}>
                  <article className={styles.signErrBox}>
                    <label htmlFor="password">Password</label>
                    {errors.password && touched.password && <small>*{errors.password}</small>}
                  </article>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
                <Button type="submit" className={styles.signButton}>
                  SIGN IN
                </Button>
              </form>
            )}
          </Formik>
        </div>
      )
  )
}

export default StudentLoginContainer