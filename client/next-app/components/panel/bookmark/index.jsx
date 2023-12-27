import React from 'react'

//styles
import styles from './index.module.css'

const Bookmark = ({ dash }) => {

    //destructuring props
    const { title, icon, detail, currency, bgColor, textColor } = dash

    return (
        <div id="bookmark-container" className={styles.bookmarkContainer} style={{backgroundColor: bgColor, backgroundImage: bgColor}} >
            <img src={icon} alt={title} />
            <span style={{ color: textColor }}>{title}</span>
            <article>
                <h1>{detail} </h1>
                {currency ? <span className={textColor}>{currency}</span> : ''}
            </article>
        </div>
    )
}

export default Bookmark