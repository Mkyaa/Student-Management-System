"use client"
import React, { useState } from 'react'

//styles
import styles from './index.module.css'

//next components
import Image from 'next/image'

//utils
import { links } from '@/utils/links'

//components
import Nav from './nav'

//hooks
import { useDispatch, useSelector } from 'react-redux'

//redux
import { setTeacher } from '@/redux/app/auth/authSlice'

//router
import { useRouter } from 'next/navigation'

//toast
import toast from 'react-hot-toast'

//react icons
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from 'react-icons/io5'


const Navbar = () => {

    //redux
    const { teacher } = useSelector(state => state.auth);

    const [isOpen, setIsOpen] = useState(false);

    //hooks
    const dispatch = useDispatch();
    const navigate = useRouter();

    //map links
    const navList = links.map((link, index) => {
        return <Nav key={index} link={link} />;
    });

    //handle logout function
    const handleLogout = () => {
        localStorage.removeItem('teacher');
        dispatch(setTeacher(null));
        navigate.push('/auth/login/teacher');
        toast.success('You have been logged out');
    };

    const handleMobileMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <aside id="sidebar-container" className={styles.sidebarContainer}>
                <h1>MANAGE STUDENT</h1>
                <div className={styles.sidebarCard}>
                    {teacher ? (
                        <>
                            <img
                                src={teacher.photo}
                                alt="avatar"
                            />
                            <h2>{teacher.fullname.toUpperCase()}</h2>
                            <p>{teacher.fieldOfEducation.toUpperCase() + ' '}TEACHER</p>
                        </>
                    ) : null}
                </div>
                <nav className={styles.sidebarNav}>
                    <ul>{navList}</ul>
                    <div className={styles.sidebarBottomBox} onClick={handleLogout}>
                        <p>Logout</p>
                        <Image
                            src="/assets/icons/logout.svg"
                            alt="logout"
                            width={17}
                            height={17}
                        />
                    </div>
                </nav>
            </aside>

            {/* MOBILE MENU */}
            <div className={styles.mobileMenuButton}>
                <RxHamburgerMenu onClick={handleMobileMenu} />
            </div>
            <div className={styles.
                mobileMenuContainer + ' ' +
                (isOpen ? styles.active : styles.inactive)
            }>
                <IoClose onClick={handleMobileMenu}  className={styles.closeIcon}/>
                <h1>MANAGE STUDENT</h1>
                <div className={styles.sidebarCard}>
                    {teacher ? (
                        <>
                            <img
                                src={teacher.photo}
                                alt="avatar"
                            />
                            <h2>{teacher.fullname.toUpperCase()}</h2>
                            <p>{teacher.fieldOfEducation.toUpperCase() + ' '}TEACHER</p>
                        </>
                    ) : null}
                </div>
                <nav className={styles.sidebarNav}>
                    <ul>{navList}</ul>
                    <div className={styles.sidebarBottomBox} onClick={handleLogout}>
                        <p>Logout</p>
                        <Image
                            src="/assets/icons/logout.svg"
                            alt="logout"
                            width={17}
                            height={17}
                        />
                    </div>
                </nav>
            </div>

            </>
            );
};

            export default Navbar;
