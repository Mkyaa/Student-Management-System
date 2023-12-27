'use client'
import React, { useEffect } from 'react'

// styles
import styles from './index.module.css'

// components
import Button from '@/shared/Button'
import Link from 'next/link'
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
import { setTeacher } from '@/redux/app/auth/authSlice'

//login
import { login } from '@/api/auth'

//loader
import Loader from '@/components/loader'


//validation schema
const userSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const TeacherLoginContainer = () => {

  //redux
  const { teacher } = useSelector(state => state.auth)
  
  //hooks
  const dispatch = useDispatch();
  const navigate = useRouter();

  // handle form submit
  const handleFormSubmit = async (values, setSubmitting) => {
    try {
      const res = await login(values.email, values.password);
      const { user } = res;

      if (user) {
        localStorage.setItem('teacher', JSON.stringify(user));
        dispatch(setTeacher(user));
        navigate.push('/panel');
        toast.success(`Welcome back, ${user.email}!`);
      } else {
        toast.error('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred during login');
    } finally {
      setSubmitting(false);
    }
  };

  // redirect to panel if teacher is logged in
  useEffect(() => {
    setTimeout(() => {
      if (teacher) {
        navigate.push('/panel');
      }
    }, 3000);
  }, [teacher]);


  return (

    teacher ? (
      <Loader text="Redirecting to the dashboard..." bg="#fbf7ff" color="#9747ff" />
    )
      :
      (
        <div className={styles.loginContainer}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={userSchema}
            onSubmit={(values, { setSubmitting }) => handleFormSubmit(values, setSubmitting)}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              errors,
              values,
              touched }) => (
              <form className={styles.signForm} onSubmit={handleSubmit}>
                <h1 className={styles.signLogo}>MANAGE STUDENT</h1>
                <h2 className={styles.signTitle}>SIGN IN</h2>
                <span className={styles.signSubtitle}>Enter your credentials to access your account</span>
                <div className={styles.signInputContainer}>
                  <article className={styles.signErrBox}>
                    <label htmlFor="email">Email</label>
                    {errors.email && touched.email && <small>*{errors.email}</small>}
                  </article>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
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
                <span className={styles.signForgot}>
                  Have you registered yet?
                  <Link href="/auth/signup/teacher" className={styles.signReset}>
                    Register now
                  </Link>
                </span>
              </form>
            )}
          </Formik>
        </div>
      )

  )
}

export default TeacherLoginContainer