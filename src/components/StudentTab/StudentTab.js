import React, {useContext} from 'react';
import styles from './StudentTab.module.css';
import {Context} from "../../index";
import {Col, Row} from "react-bootstrap";
import CustomButton from "../CustomButton/CustomButton";
import {observer} from "mobx-react-lite";

const StudentTab = observer(({
                        id,
                        name,
                        email,
                        status,
                        midtermResult,
                        finalResult,
                        isTeacher,
                        changeStudentStatus,
                        openMark
                    }) => {
    const {user} = useContext(Context)
    const {coursePage} = useContext(Context);

    const getStatusStyles = () => {
        switch (status) {
            case 'InQueue':
                return <span className={`${styles.statusLabel} ${styles.statusInQueue}`}>Ожидает</span>;
            case 'Accepted':
                return <span className={`${styles.statusLabel} ${styles.statusAccepted}`}>Принят</span>;
            case 'Declined':
                return <span className={`${styles.statusLabel} ${styles.statusDeclined}`}>Отклонен</span>;
            default:
                return '';
        }
    }

    const getAttestationStyles = (result) => {
        switch (result) {
            case 'NotDefined':
                return <span className={`${styles.attestation} ${styles.notDefined}`}>отметки нет</span>;
            case 'Passed':
                return <span className={`${styles.attestation} ${styles.passed}`}>успешно пройдена</span>;
            case 'Failed':
                return <span className={`${styles.attestation} ${styles.failed}`}>провалена</span>;
            default:
                return '';
        }
    }

    const changeStudentStatusClick = (status) => {
        changeStudentStatus(id, status);
    }

    return (
        <div className={styles.studentBlockBody}>
            <Row>
                <Col>
                    <span className={styles.studentName}>
                        {name}
                    </span>
                    <span>
                        {getStatusStyles()}
                    </span>
                    <div className={styles.studentEmail}>
                        {email}
                    </div>
                </Col>
                {(((user.inf.email === email) || isTeacher || user.roles.isAdmin) && (status === 'Accepted')) && (
                    <>
                        <Col>
                            <div className={`float-start ${styles.blockHover}`}
                                 onClick={() => {
                                     coursePage.setCurrentMark(midtermResult);
                                     coursePage.setCurrentUser(id);
                                     coursePage.setCurrentMarkType('Midterm')
                                     openMark(true);
                                 }}>
                                <div>
                                    Промежуточная аттестация:
                                </div>
                                <div>
                                    {getAttestationStyles(midtermResult)}
                                </div>
                            </div>
                            <div className={`float-lg-start float-xxl-end ${styles.blockHover}`}
                                 onClick={() => {
                                     coursePage.setCurrentMark(finalResult);
                                     coursePage.setCurrentUser(id);
                                     coursePage.setCurrentMarkType('Final')
                                     openMark(true);
                                 }}>
                                <div>
                                    Финальная аттестация:
                                </div>
                                <div>
                                    {getAttestationStyles(finalResult)}
                                </div>
                            </div>
                        </Col>
                    </>
                )}
                {
                    ((status === 'InQueue') && (isTeacher || user.roles.isAdmin)) && (
                        <Col>
                            <div className='float-sm-start float-lg-end'>
                                <div>
                                    {(coursePage.studentDifference === 0) ? (
                                            <CustomButton color='green' name='Принять' clickFunc={changeStudentStatusClick}
                                                          value='Accepted' isDisabled={true}/>
                                        )
                                        :
                                        <CustomButton color='green' name='Принять' clickFunc={changeStudentStatusClick}
                                                      value='Accepted'/>
                                    }
                                </div>
                                <div className='mt-2'>
                                    <CustomButton color='red' name='Отклонить' clickFunc={changeStudentStatusClick}
                                                  value='Declined'/>
                                </div>
                            </div>
                        </Col>
                    )
                }
            </Row>
        </div>
    );
});

export default StudentTab;