import React, {useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import styles from './AddTeacher.module.css';
import CustomButton from "../CustomButton/CustomButton";
import {Context} from "../../index";
import SelectField from "../SelectField/SelectField";

const AddTeacher = ({show, onHide, clickFunction}) => {
    const {coursePage} = useContext(Context);

    const afterClickOk = () => {
        clickFunction(coursePage.id, coursePage.addingTeacherId);
        onHide();
        coursePage.setAddingTeacherId(coursePage.usersList[0].id);
    }
    return (
        <Modal show={show} onHide={onHide} className="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>Добавление преподавателя для курса "<span className={styles.label}>{coursePage.courseName}"</span></Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <SelectField header={'Преподаватель'} fields={coursePage.usersList} setChoice={coursePage.setAddingTeacherId.bind(coursePage)} isAdding={true}/>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <CustomButton name={'Создать'} color={'green'} clickFunc={afterClickOk}/>
                <CustomButton name={'Отмена'} color={'gray'} clickFunc={onHide}/>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTeacher;