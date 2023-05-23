import styles from "../components/CourseField/CourseField.module.css";
import React from "react";

export const statusStyle = (status) => {
    switch (status) {
        case 'Закрыт':
            return <span className={styles.courseStatusClosed}>{status}</span>
        case 'Создан':
            return <span className={styles.courseStatusCreated}>{status}</span>
        case 'Открыт для записи':
            return <span className={styles.courseStatusOpen}>{status}</span>
        case 'В процессе обучения':
            return <span className={styles.courseStatusInProcess}>{status}</span>
        default:
            return '';
    }
}