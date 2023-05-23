import React, {useContext} from 'react';
import styles from './CourseMainInfTable.module.css';
import {Col, Row} from "react-bootstrap";
import {statusStyle} from "../../utils/getStatusStyle";
import {Context} from "../../index";
import CustomButton from "../CustomButton/CustomButton";

const CourseMainInfTable = ({showModal, isCourseTeacher, isStudent, signUpClick}) => {
    const {user} = useContext(Context);
    const {coursePage} = useContext(Context);

    return (
        <div className={styles.infTable}>
            <Row className={styles.tableBlock}>
                <Col xxl={10} xl={9} lg={9} md={8} sm={7}>
                    <div className={styles.boldLabel}>
                        Статус курса
                    </div>
                    <div>
                        {statusStyle(coursePage.status)}
                    </div>
                </Col>
                <Col xxl={2} xl={3} lg={3} md={4} sm={5}>
                    {(user.roles.isAdmin || isCourseTeacher) ?
                        <div className={`${styles.editButton} mb-2 mb-sm-0`}>
                            <CustomButton name='Изменить' color='yellow' clickFunc={showModal} value={true}/>
                        </div>
                        : ''
                    }
                    {(!(isStudent || isCourseTeacher) && (coursePage.rawStatus === 'OpenForAssigning')) ?
                        <div className={`${styles.editButton} mb-2`}>
                            <CustomButton name='Записаться' color='green' clickFunc={signUpClick}/>
                        </div>
                        :
                        ''
                    }
                </Col>
            </Row>
            <Row className={styles.tableBlock}>
                <Col>
                    <div className={styles.boldLabel}>
                        Учебный год
                    </div>
                    <div>
                        {coursePage.year}
                    </div>
                </Col>
                <Col>
                    <div className={styles.boldLabel}>
                        Семестр
                    </div>
                    <div>
                        {coursePage.semester}
                    </div>
                </Col>
            </Row>
            <Row className={styles.tableBlock}>
                <Col>
                    <div className={styles.boldLabel}>
                        Всего мест
                    </div>
                    <div>
                        {coursePage.allPlaces}
                    </div>
                </Col>
                <Col>
                    <div className={styles.boldLabel}>
                        Студентов зачислено
                    </div>
                    <div>
                        {coursePage._enrolledStudentsCount}
                    </div>
                </Col>
            </Row>
            <Row className={styles.tableBlock}>
                <Col>
                    <div className={styles.boldLabel}>
                        Заявок на рассмотрении
                    </div>
                    <div>
                        {coursePage._pendingStudentsCount}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CourseMainInfTable;