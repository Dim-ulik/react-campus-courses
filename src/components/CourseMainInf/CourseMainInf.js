import React, {useContext, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import CustomButton from "../CustomButton/CustomButton";
import styles from './CourseMainInf.module.css';
import CourseMainInfTable from "../CourseMainInfTable/CourseMainInfTable";
import {Context} from "../../index";

const CourseMainInf = ({showModalEditing, showModalStatus, isCourseTeacher, deleteCourseClick, isStudent, signUpClick}) => {
    const {user} = useContext(Context);
    const {coursePage} = useContext(Context);

    return (
        <div className={styles.mainStyle}>
            <Row>
                <Col sm={12}>
                    Основные данные курса
                </Col>
                {(user.roles.isAdmin || isCourseTeacher) ?
                    <Col className='mb-2 mt-2' lg={2}>
                        <CustomButton name='Редактировать' color='green' clickFunc={showModalEditing} value={true}/>
                    </Col>
                    : ''
                }
                {(user.roles.isAdmin) ?
                    <Col className='mb-2 mt-2' lg={2}>
                        <CustomButton name='Удалить' color='red' clickFunc={deleteCourseClick} value={coursePage.id}/>
                    </Col>
                    : ''
                }
            </Row>
            <div className='mt-2'>
                <CourseMainInfTable showModal={showModalStatus} isCourseTeacher={isCourseTeacher} isStudent={isStudent} signUpClick={signUpClick}/>
            </div>
        </div>
    );
};

export default CourseMainInf;