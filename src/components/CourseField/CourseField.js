import React from 'react';
import styles from './CourseField.module.css';
import {Col, NavLink, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {COURSES_ROUTE} from "../../utils/const";
import {statusStyle} from "../../utils/getStatusStyle";

const CourseField = ({name, status, studyYear, semester, allPlaces, freePlaces, courseId}) => {
    return (
        <NavLink as={Link} to={COURSES_ROUTE + '/' + courseId}>
            <div className={styles.courseCard}>
                <Row>
                    <Col lg={6} md={8} sm={10}>
                        <div className={styles.courseName}>
                            {name}
                        </div>
                        <div className={styles.infBlock}>
                            <div>
                                Учебный год - <span className={styles.spanInf}>{studyYear}</span>
                            </div>
                            <div>
                                Семестр - <span className={styles.spanInf}>{semester}</span>
                            </div>
                        </div>
                        <div className={styles.extraInf}>
                            <div>
                                Мест всего - <span className={styles.spanInf}>{allPlaces}</span>
                            </div>
                            <div>
                                Мест свободно - <span className={styles.spanInf}>{freePlaces}</span>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} md={4} sm={2}>
                        <div className={styles.leftPart}>
                            {statusStyle(status)}
                        </div>
                    </Col>
                </Row>
            </div>
        </NavLink>
    );
};

export default CourseField;