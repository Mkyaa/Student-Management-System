'use client'
import React from 'react';

// styles
import styles from './index.module.css';

// components
import Button from '@/shared/Button';
import Link from 'next/link';

//formik and yup
import { Formik } from 'formik';
import * as Yup from 'yup';

//hooks
import { useRouter } from 'next/navigation';

//toaster for notifications
import toast from 'react-hot-toast';

//api
import { signup } from '@/api/auth';

//mui
import { Checkbox, Tooltip } from '@mui/material';

//shared components
import Input from '@/shared/Input';

//material ui checkbox props
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//validation schema
const userSchema = Yup.object().shape({
  fullname: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  fieldOfEducation: Yup.string().required('Field of Education is required'),
  termsChecked: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
  photo: Yup.string().required('Photo is required'),
});

const SignUpContainer = () => {

  //hooks
  const router = useRouter();

  // handle form submit
  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await signup(values);

      if (response.status === 201) {
        const responseData = response.data;
        toast.success(responseData.message);
        router.push('/auth/login/teacher');
      } else {
        const errorData = response.data;
        toast.error(errorData.message || 'An error occurred during signup');
      }
    } catch (error) {
      toast.error('An unexpected error occurred during signup');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className={styles.signupContainer}>
      <Formik
        initialValues={{
          fullname: '',
          email: '',
          password: '',
          fieldOfEducation: 'math',
          termsChecked: false,
          photo: '',
        }}
        validationSchema={userSchema}
        onSubmit={(values, actions) => handleFormSubmit(values, actions)}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
          <form className={styles.signUpForm} onSubmit={handleSubmit}>
            <h1 className={styles.signUpLogo}>MANAGE STUDENT</h1>
            <h2 className={styles.signUpTitle}>SIGN UP</h2>
            <span className={styles.signUpSubtitle}>Enter your details to create an account</span>

            <div className={styles.signUpInputContainer}>
              <article className={styles.signUpErrBox}>
                <label htmlFor='fullname'>Full Name</label>
                {touched.fullname && errors.fullname && <small>*{errors.fullname}</small>}
              </article>
              <input
                id='fullname'
                name="fullname"
                value={values.fullname}
                placeholder="Enter your fullname"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className={styles.signUpInputContainer}>
              <article className={styles.signUpErrBox}>
                <label htmlFor='email'>Email</label>
                {touched.email && errors.email && <small>*{errors.email}</small>}
              </article>
              <Input
                id='email'
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </div>

            <div className={styles.signUpInputContainer}>
              <article className={styles.signUpErrBox}>
                <label htmlFor='password'>Password</label>
                {touched.password && errors.password && <small>*{errors.password}</small>}
              </article>
              <Input
                id='password'
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>

            <div className={styles.signUpInputContainer}>
              <article className={styles.signUpErrBox}>
                <label htmlFor='photo'>Photo</label>
                {touched.photo && errors.photo && <small>*{errors.photo}</small>}
              </article>
              <Input
                id='photo'
                placeholder="Photo URL"
                name="photo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.photo}
              />
            </div>

            <div className={styles.signUpInputContainer}>
              <article className={styles.signUpErrBox}>
                <label htmlFor='fieldOfEducation'>Field of Education</label>
                {touched.fieldOfEducation && errors.fieldOfEducation && <small>*{errors.fieldOfEducation}</small>}
              </article>
              <select
                id='fieldOfEducation'
                name="fieldOfEducation"
                value={values.fieldOfEducation}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.signUpSelect}
              >
                <option value="math">Math</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
                <option value="english">English</option>
              </select>
            </div>
            <div className={styles.signUpCheckboxContainer}>
              <div className={styles.signUpCheckbox}>
                <Checkbox id='termsChecked' {...label} color="secondary" onChange={handleChange} />
                <label htmlFor='termsChecked'>I agree to the
                  <Tooltip title="I agree to the terms and conditions" arrow>
                    <Link href="#" className={styles.signUpTerms}>terms and conditions</Link>
                  </Tooltip>
                </label>
              </div>
              <article className={styles.signUpCheckErrBox}>
                {touched.termsChecked && errors.termsChecked && <small>*{errors.termsChecked}</small>}
              </article>
            </div>

            <Button
              type='submit'
              className={styles.signUpButton}
              disabled={isSubmitting}
            >SIGN UP</Button>

            <span className={styles.signUpForgot}>
              Have you ever registered before?
              <Link href="/auth/login\teacher" className={styles.signUpReset}>Login Now</Link>
            </span>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpContainer;
