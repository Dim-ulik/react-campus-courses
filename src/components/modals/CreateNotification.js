import React, {useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import CustomButton from "../CustomButton/CustomButton";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import styles from './CreateNotifications.module.css';

const CreateNotification = observer(({show, onHide, clickFunc}) => {
    const {coursePage} = useContext(Context);

    const afterClickOk = () => {
        clickFunc(coursePage.id, coursePage.editingNotifications, coursePage.editingNotificationsImportant);
        onHide();
        coursePage.setEditingNotifications('');
    }

    return (
        <Modal show={show} onHide={onHide} className="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>Создание уведомления для курса "<span className={styles.label}>{coursePage.courseName}"</span></Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <div className={styles.label}>Текст уведомления</div>
                    <textarea className={styles.inputNotification} onChange={(e) => {
                        coursePage.setEditingNotifications(e.target.value);
                    }}>{coursePage.editingNotifications}</textarea>
                </div>
                <div className='mt-3'>
                    <input type='checkbox' checked={coursePage.editingNotificationsImportant} onClick={(e) => {
                        coursePage.setEditingNotificationsImportant(!coursePage.editingNotificationsImportant);
                    }}/>
                    <span className={styles.inputNotificationImportant}>Важное уведомление</span>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <CustomButton name={'Создать'} color={'green'} clickFunc={afterClickOk}/>
                <CustomButton name={'Отмена'} color={'gray'} clickFunc={onHide}/>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateNotification;