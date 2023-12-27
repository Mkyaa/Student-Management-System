import React from 'react'

// styles
import styles from './index.module.css'

// components
import { Triangle } from 'react-loader-spinner'

const Loader = ({
    text,
    bg,
    color
}) => {

    return (
        <div className={styles.loaderContainer} style={{ backgroundColor: bg }}>
            <div className={styles.loaderBox}>
                <Triangle
                    visible={true}
                    height="80"
                    width="80"
                    color={color}
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                <p className={styles.loaderText} style={{ color: color }}>{text}</p>
            </div>
        </div>
    )
}

export default Loader