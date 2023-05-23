import React from 'react';
import styles from './TeacherTab.module.css';

const TeacherTab = ({name, email, isMain}) => {
    return (
        <div className={styles.teacherBlockBody}>
            <div>
                <span className={styles.teacherName}>
                    {name}
                </span>
                {
                    isMain &&
                    <span className={styles.mainTeacherLabel}>
                    основной
                </span>
                }
            </div>
            <div className={styles.teacherEmail}>
                {email}
            </div>
        </div>
    );
};

export default TeacherTab;