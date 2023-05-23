import React from 'react';
import styles from './Notification.module.css'

const Notification = ({text, status}) => {
    return (
        <div className={status ? `${styles.dangerous} ${styles.notification}` : `${styles.notification}`}>
            {status ? <span className={styles.important}>ВАЖНО: </span> : ''}{text}
        </div>
    )
};

export default Notification;