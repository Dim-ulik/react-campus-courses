import React, {useContext} from 'react';
import styles from './InformationCourseCard.module.css';
import {Tab, Tabs} from "react-bootstrap";
import {Context} from "../../index";
import Notification from "../Notification/Notification";
import CustomButton from "../CustomButton/CustomButton";

const InformationCourseCard = ({isTeacher, openModal}) => {
    const {coursePage} = useContext(Context);
    const {user} = useContext(Context);

    const createMarkup = (string) => {
        return {__html: string};
    };
    const notificationString = coursePage.notificationsCount > 0 ?
        <span className={styles.labelTab}>Уведомления {coursePage.notificationsCount && <span
            className={styles.notificationsCounter}>{coursePage.notificationsCount}</span>}</span> :
        <span className={styles.labelTab}>Уведомления</span>;
    const requirementsString = <span className={styles.labelTab}>Требования</span>
    const annotationString = <span className={styles.labelTab}>Аннотация</span>

    return (
        <div className={styles.cardBlock}>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3 justify-content-between"
            >
                <Tab eventKey="requirements" title={requirementsString} className={styles.cardContent}>
                    <div dangerouslySetInnerHTML={createMarkup(coursePage.requirements)}/>
                </Tab>
                <Tab eventKey="annotation" title={annotationString} className={styles.cardContent}>
                    <div dangerouslySetInnerHTML={createMarkup(coursePage.annotations)}/>
                </Tab>
                <Tab eventKey="notifications" title={notificationString} className={styles.cardContent}>
                    {(user.roles.isAdmin || isTeacher) ?
                        <div className='mb-3'>
                            <CustomButton name='Создать уведомление' color='green' clickFunc={openModal} value={true}/>
                        </div>
                        : ''
                    }
                    {coursePage.notifications && coursePage.notifications.map(item => (
                        <Notification text={item.text} status={item.isImportant}/>
                    ))}
                </Tab>
            </Tabs>
        </div>
    );
};

export default InformationCourseCard;