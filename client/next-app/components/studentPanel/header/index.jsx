'use client'
import React, { useState } from 'react'

//styles
import styles from './index.module.css'

//mui components
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

//hooks
import { useDispatch, useSelector } from 'react-redux';

//link
import Link from 'next/link';

//navigation
import { useRouter } from 'next/navigation';

//redux
import { setStudent } from '@/redux/app/auth/authSlice';

//toast
import toast from 'react-hot-toast';

const StudentPanelHeader = () => {

    //redux
    const { student } = useSelector(state => state.auth);

    //hooks
    const dispatch = useDispatch();
    const navigate = useRouter();

    //get first letter of name and surname
    const studentName = student.fullname.split(' ')
    const psStudenName = studentName[0][0] + studentName[1][0]

    //menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //logout
    const handleLogout = () => {
        try {
            handleClose();
            navigate.push('/auth/login/student');
            localStorage.removeItem('student');
            dispatch(setStudent(null));
            toast.success('You have been logged out');
        } catch (error) {
            toast.error('An error occurred while logging out');
        }
    };

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
                <div className={styles.headerLogo}>
                    <Link href="/studentPanel"> MANAGE STUDENT </Link>
                </div>
            </div>
            <div className={styles.headerRight}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>{psStudenName}</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default StudentPanelHeader