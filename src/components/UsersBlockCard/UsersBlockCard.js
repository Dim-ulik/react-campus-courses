import React, {useContext} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import CustomButton from "../CustomButton/CustomButton";
import styles from './UsersBlockCard.module.css';
import {Context} from "../../index";
import TeacherTab from "../TeacherTab/TeacherTab";
import StudentTab from "../StudentTab/StudentTab";
import {observer} from "mobx-react-lite";

const UsersBlockCard = observer(({isMainTeacher, openModal, isTeacher, changeStudentStatus, openMark}) => {
    const teachersString = <span className={styles.labelTab}>Преподаватели</span>
    const studentsString = <span className={styles.labelTab}>Студенты</span>
    const {coursePage} = useContext(Context);
    const {user} = useContext(Context);

    return (
        <div className={styles.cardBlock}>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3 justify-content-between"
            >
                <Tab eventKey="requirements" title={teachersString} className={styles.cardContent}>
                    {(user.roles.isAdmin || isMainTeacher) ?
                        <div className='mb-3'>
                            <CustomButton name='Добавить преподавателя' color='green' clickFunc={openModal}
                                          value={true}/>
                        </div>
                        : ''
                    }
                    {coursePage.teachers && coursePage.teachers.map(item => (
                        <TeacherTab name={item.name} email={item.email} isMain={item.isMain} key={item.email}/>
                    ))}
                </Tab>
                <Tab eventKey="annotation" title={studentsString} className={styles.cardContent}>
                    {
                        (!(isTeacher || user.roles.isAdmin)) ?
                            coursePage.students && coursePage.students.map(item => (
                                (item.status === 'Accepted') ?
                                    <StudentTab name={item.name} email={item.email} id={item.id} key={item.id}
                                                status={item.status}
                                                finalResult={item.finalResult} midtermResult={item.midtermResult}
                                                isTeacher={isTeacher} changeStudentStatus={changeStudentStatus}
                                                openMark={openMark}/>
                                    : ''
                            ))
                            :
                            coursePage.students && coursePage.students.map(item => (
                                <StudentTab name={item.name} email={item.email} id={item.id} key={item.id}
                                            status={item.status}
                                            finalResult={item.finalResult} midtermResult={item.midtermResult}
                                            isTeacher={isTeacher} changeStudentStatus={changeStudentStatus}
                                            openMark={openMark}/>
                            ))
                    }

                </Tab>
            </Tabs>
        </div>
    );
});

export default UsersBlockCard;